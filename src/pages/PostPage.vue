
<template>
  <div>
    <h1>страница с постами</h1>
    <my-input v-model:value="searchQuery" placeholder="Поиск..." />
    <div class="app__btns">
      <my-button @click="showDialog"> Создать пост </my-button>
      <my-select v-model="selectedSort" :options="sortOptions"></my-select>
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @createPost="createPost" />
    </my-dialog>

    <post-list
      :posts="sortedAndSearchedPosts"
      @remove="removePost"
      v-if="!isPostLoading"
    />
    <p v-else>Идёт загрузка...</p>
    <div ref="observer" class="observer"></div>
  </div>
</template>

<script>
import PostForm from "../components/PostForm.vue";
// import PostForm from "./src/components/PostForm.vue";
import PostList from "../components/PostList.vue";
import PagesList from "../components/PagesList.vue";
import axios from "axios";
export default {
  components: {
    PostForm,
    PostList,
    PagesList,
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      modificatorValue: "",
      isPostLoading: false,
      selectedSort: "",
      searchQuery: "",
      totalPages: 0,
      page: 1,
      limit: 10,
      sortOptions: [
        {
          value: "title",
          name: "По названию",
        },
        {
          value: "description",
          name: "По содержимому",
        },
      ],
    };
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(_post) {
      let index = this.posts.findIndex((post) => post.id == _post.id);
      this.posts.splice(index, 1);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async fetchPosts() {
      try {
        this.isPostLoading = true;
        let respons = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.totalPages = Math.ceil(
          respons.headers["x-total-count"] / this.limit
        );
        this.posts = Array.from(respons.data).map((item) => {
          return {
            id: item.id,
            title: item.title,
            description: item.body,
          };
        });
      } catch (ex) {
        alert(ex);
      } finally {
        this.isPostLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.page++;
        let respons = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.totalPages = Math.ceil(
          respons.headers["x-total-count"] / this.limit
        );
        let newPosts = Array.from(respons.data).map((item) => {
          return {
            id: item.id,
            title: item.title,
            description: item.body,
          };
        });
        this.posts = [...this.posts, ...newPosts];
      } catch (ex) {
        alert(ex);
      }
    },
  },
  mounted() {
    this.fetchPosts();
    const options = {
      rootMargin: "0px",
      threshold: 1.0,
    };
    const callback = (entries, observer) => {
      if (entries[0].isIntersecting && this.posts.length > this.page) {
        this.loadMorePosts();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer);
  },
  computed: {
    sortedPosts() {
      return this.posts.sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(
          post2[this.selectedSort]
        );
      });
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  watch: {
    selectedSort(newValue) {},
    dialogVisible(newValue) {},
  },
};
</script>

<style scoped>
.app__btns {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}

.observer {
  height: 30px;
  background: green;
}
</style>
I