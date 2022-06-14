<template>
  <div class="navbar">
    <p @click="$router.push('/')">Vue 3</p>
    <div class="navbar__btns">
      <my-button @click="$router.push('/posts')">Посты</my-button>
      <my-button @click="$router.push('/about')">О нас</my-button>
      <my-button @click="$router.push('/store')">Store</my-button>
      <my-button @click="$router.push('/composition')">Composition</my-button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.navbar {
  height: 50px;
  background: rgb(199, 199, 199);
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
  margin-top: 0;
}
.navbar__btns {
  margin-left: auto;
}
</style>