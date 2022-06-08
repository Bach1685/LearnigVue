<template>
  <div v-if="posts.length">
    <h3>Список постов</h3>
    <post-item
      class="post"
      :post="post"
      v-for="post of posts"
      :key="post.id"
      @remove="$emit('remove', post)"
    />
  </div>
  <h2 v-else>Нет постов!</h2>
</template>

<script>
import PostItem from "./PostItem.vue";
export default {
  components: {
    PostItem,
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      post: {
        title: "",
        description: "",
      },
    };
  },
};
</script>

<style scoped>
</style>