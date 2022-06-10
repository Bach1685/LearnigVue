<template>
  <form class="form" @submit.prevent>
    <h4>Создание поста</h4>
    <my-input
      v-focus
      class="input"
      v-model:value="post.title"
      type="text"
      placeholder="Название"
    />
    <my-input
      v-focus
      class="input"
      v-model:value="post.description"
      type="text"
      placeholder="Описание"
    />
    <my-button @click="createPost">Создать</my-button>
  </form>
</template>
<script>
export default {
  data() {
    return {
      post: {
        id: 0,
        title: "",
        description: "",
      },
      posts: [],
      currentId: 0,
    };
  },
  methods: {
    createPost() {
      this.post.id = Date.now;
      this.$emit("createPost", this.post);
      // this.post = {};
      this.currentId++;
    },
  },
  watch: {
    post: {
      handler(newValue) {
        console.log(newValue);
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
}
</style>