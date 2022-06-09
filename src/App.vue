
<template>
  <div class="app">
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
  </div>
</template>

<script>
import PostForm from "./components/PostForm.vue";
import PostList from "./components/PostList.vue";
import axios from "axios";
export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      modificatorValue: "",
      isPostLoading: false,
      selectedSort: "",
      searchQuery: "",
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
          "https://jsonplaceholder.typicode.com/posts?_limit=10"
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
  },
  mounted() {
    this.fetchPosts();
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
    selectedSort(newValue) {
      // console.log(this.selectedSort);
    },
    dialogVisible(newValue) {},
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app__btns {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}

.app {
  padding: 20px;
}
</style>
I