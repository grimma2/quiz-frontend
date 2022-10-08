<template>
  <div class="home">
    <button @click="$router.push({path: '/games'})">Создать игру</button>
    <button @click="$router.push({path: '/code-input'})">Войти в существующую</button>
  </div>
</template>

<script>
export default {
  name: "Home"
}
</script>

<style scoped>

</style>