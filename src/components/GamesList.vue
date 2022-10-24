<template>
  <div class="games-list">
    <div
      class="game"
      v-for="game in games"
      :key="game.pk"
      @click.stop="$router.push({path: `/game/${game.pk}`})"
    >
      <p class="game-name">{{ game.name }}</p>
      <game-controls
        :game="game"
        @deleteGameSave="deleteGameSave"
        @setState="setState"
      />
    </div>
  </div>
</template>

<script>
import GameControls from "@/components/GameControls";

export default {
  name: "GamesList",
  components: {GameControls},
  props: {
    games: {
      type: Array,
      required: true
    }
  },
  methods: {
    setState (gameState, gamePk) {
      this.$emit('setState', gameState, gamePk)
    },
    deleteGameSave (gamePk) {
      this.$emit('deleteGameSave', gamePk)
    }
  }
}
</script>

<style scoped>

</style>