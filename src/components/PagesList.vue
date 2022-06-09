<template>
  <ul class="pages-list">
    <li v-for="pageNumber in pagesCount" :key="pageNumber">
      <my-button
        class="page"
        :class="{ 'current-page': page === pageNumber }"
        @click="selectPage(pageNumber)"
        >{{ pageNumber }}</my-button
      >
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    pagesCount: {
      type: Number,
      required: true,
    },
    page: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    selectPage(page) {
      this.$emit("selectPage", page);
    },
  },
};
</script>
<style scoped>
ul li {
  list-style: none;
}
.pages-list {
  display: flex;
  flex-direction: row;
}

.page {
  border: 1px solid black;
}

.current-page {
  border: 3px solid teal;
}
</style>