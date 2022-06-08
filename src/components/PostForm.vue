<template>
  <form class="form" @submit.prevent>
    <h4>Создание поста</h4>
    <my-input
      class="input"
      v-model:value="post.title"
      type="text"
      placeholder="Название"
    />
    <my-input
      class="input"
      v-model="post.description"
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
      this.post.id = this.currentId;
      this.$emit("createPost", this.post);
      // this.post = {};
      this.currentId++;
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