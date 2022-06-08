
<template>
  <div class="app">
    <post-form @createPost="createPost" />
    <post-list :posts="posts" @remove="removePost" />
  </div>
</template>

<script>
import PostForm from "./components/PostForm.vue";
import PostList from "./components/PostList.vue";
export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      post: {
        id: 0,
        title: "",
        description: "",
      },
      posts: [
        {
          id: 1,
          title: "123",
          description: "123",
        },
        {
          id: 2,
          title: "567",
          description: "567",
        },
      ],
    };
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
    },
    removePost(_post) {
      console.log(12);
      let index = this.posts.findIndex((post) => post.id == _post.id);
      this.posts.splice(index, 1);
    },
  },
};
</script>


<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}
</style>
I