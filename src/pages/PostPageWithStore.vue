
<template>
  <div>
    <h1>страница с постами</h1>
    <!-- <my-input v-model:value="searchQuery" placeholder="Поиск..." /> -->
    <div class="app__btns">
      <my-button @click="showDialog"> Создать пост </my-button>
      <!-- <my-select v-model="selectedSort" :options="sortOptions"></my-select> -->
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
    <div
      v-intersection="{ isEnd: posts.length > page, callback: loadMorePosts }"
      class="observer"
    ></div>
  </div>
</template>

<script>
import PostForm from "../components/PostForm.vue";
// import PostForm from "./src/components/PostForm.vue";
import PostList from "../components/PostList.vue";
import PagesList from "../components/PagesList.vue";
import axios from "axios";
import { mapMutations, mapGetters, mapState, mapActions } from "vuex";
export default {
  components: {
    PostForm,
    PostList,
    PagesList,
  },
  methods: {
    ...mapActions({
      loadMorePosts: "post/loadMorePosts",
      featchPosts: "post/featchPosts",
    }),
    ...mapMutations({
      setPage: "post/setPage",
    }),
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
  },
  mounted() {
    // this.fetchPosts();
    // const options = {
    //   rootMargin: "0px",
    //   threshold: 1.0,
    // };
    // const callback = (entries, observer) => {
    //   if (entries[0].isIntersecting && this.posts.length > this.page) {
    //     this.loadMorePosts();
    //   }
    // };
    // const observer = new IntersectionObserver(callback, options);
    // observer.observe(this.$refs.observer);
  },
  computed: {
    ...mapState({
      posts: (state) => state.post.posts,
      isPostLoading: (state) => state.post.isPostLoading,
      selectedSort: (state) => state.post.selectedSort,
      searchQuery: (state) => state.post.searchQuery,
      totalPages: (state) => state.post.totalPages,
      page: (state) => state.post.page,
      limit: (state) => state.post.limit,
      sortOptions: (state) => state.post.sortOptions,
    }),
    ...mapGetters({
      sortedPosts: "post/sortedPosts",
      sortedAndSearchedPosts: "post/sortedAndSearchedPosts",
    }),
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