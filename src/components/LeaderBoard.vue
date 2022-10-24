<template>
  <div class="leader-board">
    <div v-for="team in leaderBoard.teams">
      {{ team.name }}
    </div>
    <button
      class="exit-button"
      @click="removeCookie"
      v-if="$store.state.team.gameState === 'OFF'"
    >Выйти</button>
  </div>
</template>

<script>
export default {
  name: "LeaderBoard",
  props: {
    leaderBoard: {
      type: Object,
      required: true
    }
  },
  methods: {
    removeCookie() {
      document.cookie = 'inGame=1; Max-Age=-99999999;'
      this.$store.commit('team/setLeaderBoard', {})
    }
  }
}
</script>

<style scoped>

</style>