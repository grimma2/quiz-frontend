<template>
  <div class="user-games">
    <games-list :games="games" @setState="setGameState" @deleteGameSave="deleteGameSave"/>
  </div>
  <button @click="$router.push({path: '/game/create'})">Создать новую</button>
</template>

<script>
import GamesList from "@/components/GamesList";
import {ax} from '@/api/defaults'
import game from '@/mixins/gameDelete'

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
    setGameState (gameState, gamePk) {
      this.$store.dispatch('game/makeGameSocket', gamePk)

      setTimeout(() => {
        try {
          this.$store.state.game.gameSocket.send(JSON.stringify({
            type: 'change_state',
            game_state: gameState
          }))
        } catch (e) {
          window.location.reload()
        }
        this.$store.state.game.gameSocket.close()
      }, 1000)

      for (let game of this.games) {
        if (gamePk === game.pk) {
          game.game_state = gameState
        }
      }
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