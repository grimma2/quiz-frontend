<template>
  <div class="game-controls">
    <div class="game-on" v-if="game.game_state === 'ON'">
      <p class="game-timer">game_time</p>
      <button class="stop-game" @click.stop="$emit('setState', 'OFF', game.pk)">
        Остановить игру
      </button>
    </div>
    <div class="game-off" v-else>
      <img src="#" @click.stop="$emit('deleteGameSave', game.pk)">
      <button @click.stop="$emit('setState', 'ON', game.pk)">Запустить игру</button>
      <button @click.stop="$router.push({path: `/game/${game.pk}/edit`})">Редактировать</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameControls",
  props: {
    game: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>