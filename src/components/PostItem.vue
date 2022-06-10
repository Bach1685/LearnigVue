<template>
  <div class="post">
    <div>
      <div>{{ post.id }}</div>
      <h5><span class="post-title">Название:</span>{{ post.title }}</h5>
      <p><span class="post-title">Описание:</span> {{ post.description }}</p>
    </div>
    <div class="post_btn">
      <my-button @click="$router.push(`/posts/${post.id}`)" class="btn"
        >Открыть</my-button
      >
      <my-button @click="$emit('remove', post)" class="btn">Удалить</my-button>
      <div class="fghj"></div>
    </div>
  </div>
</template>

<script>
import MyButton from "./UI/MyButton.vue";
export default {
  components: {
    MyButton,
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style scoped>
.post {
  padding: 0 15px;
  margin-top: 10px;
  border: 2px solid teal;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.post_btn {
  display: flex;
}

.fghj {
  display: flex;
}
.post-title {
  font-size: 18px;
}
</style>