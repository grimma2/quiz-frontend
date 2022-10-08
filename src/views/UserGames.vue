<template>
  <div class="user-games">
    <games-list :games="games" @setState="setGameState" @deleteGameSave="deleteGameSave"/>
  </div>
</template>

<script>
import GamesList from "@/components/GamesList";
import {ax} from '@/api/defaults'
import game from '@/mixins/game'

export default {
  name: "UserGames",
  components: {GamesList},
  mixins: [game],
  data () {
    return {
      games: []
    }
  },
  methods: {
    async fetchGames (games) {
      try {
        const response = await ax.post('game/list/', {games: games})
        return response.data
      } catch (e) {
        console.log(e)
      }
    },
    setGameState (gamePk, gameState) {
      for (let game of this.games) {
        if (gamePk === game.pk) {
          game.game_state = gameState
        }
      }
      this.$store.dispatch('events/setGameState', gamePk, gameState)
    },
    deleteGameSave (gamePk) {
      this.deleteGame(gamePk)
      this.games = this.games.filter(game => game.pk !== gamePk)
    },
  },
  async mounted () {
    let games = localStorage.getItem('games')
    if (!games) return
    this.games = await this.fetchGames(JSON.parse(games))
  }
}
</script>

<style scoped>

</style>