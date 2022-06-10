<template>
<h1>{{$store.state.isAuth ? 'пользователь авторизован' : 'Авторизуйтесь, чтобы войти'}}</h1>
  <h1>{{ $store.getters.doubleLikes }}</h1>
  <my-button @click="$store.commit('incrementLikes')">Лайк</my-button>
  <my-button @click="$store.commit('decrementLikes')">Дизлайк</my-button>
</template>

<script>
export default {};
</script>

<style>
</style>