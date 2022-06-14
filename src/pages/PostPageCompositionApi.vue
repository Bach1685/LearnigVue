
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
    <!-- <div
      v-intersection="{ isEnd: posts.length > page, callback:  loadMorePosts }"
      class="observer"
    ></div> -->
  </div>
</template>

<script>
import PostForm from "../components/PostForm.vue";
import PostList from "../components/PostList.vue";
import PagesList from "../components/PagesList.vue";
import { usePosts } from "../hooks/usePosts";
import useSortedPosts from "../hooks/useSortedPosts";
import useSortedAndSearchedPosts from "../hooks/useSortedAndSearchedPosts";
export default {
  components: {
    PostForm,
    PostList,
    PagesList,
  },
  data() {
    return {
      dialogVisible: false,
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
  setup(props) {
    const { posts, totalPages, isPostLoading } = usePosts(10);
    const { sortedPosts, selectedSort } = useSortedPosts(posts);
    const { searchQuery, sortedAndSearchedPosts } =
      useSortedAndSearchedPosts(sortedPosts);
    return {
      posts,
      totalPages,
      isPostLoading,
      sortedPosts,
      selectedSort,
      searchQuery,
      sortedAndSearchedPosts,
    };
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