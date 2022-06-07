<template>
  <form class="form" @submit.prevent>
    <h4>Создание поста</h4>
    <input
      class="input"
      v-model="post.title"
      type="text"
      placeholder="Название"
    />
    <input
      class="input"
      v-model="post.description"
      type="text"
      placeholder="Описание"
    />
    <my-button @click="createPost">Создать</my-button>
  </form>
</template>
<script>
import MyButton from "./UI/MyButton.vue";
export default {
  components: {
    MyButton,
  },
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
      this.post = {};
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
.input {
  border: 1px solid teal;
  padding: 10px 15px;
  margin-top: 15px;
}
</style>