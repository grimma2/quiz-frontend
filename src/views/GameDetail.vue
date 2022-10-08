<template>
  <div class="game-detail">
    <p class="game-name">{{ game.name }}</p>
    <div class="teams">
      <div class="team" v-for="team in game.team_set" :key="team.pk">
        <p>Команда</p>
        <p>{{ team.code }}</p>
      </div>
      <button @click="generateTeamCodes">Пересоздать коды у комманд</button>
    </div>
    <div class="game-config">
      <div class="questions">
        <div class="question" v-for="question in game.question_set" :key="question.pk">
          <p class="ques-text">{{ question.text }}</p>
          <div class="ques-correct-answers">
            <div class="ques-answer" v-for="quesAnswer in question.correct_answers" :key="quesAnswer">
              <p class="blue-answer" v-if="!quesAnswer.rare">{{ quesAnswer.text }}</p>
              <p class="orange-answer" v-else>{{ quesAnswer.text }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="teams">
        {{ game.users_in_team_lim }}
      </div>
    </div>
    <game-controls
      :game="game"
      @setState="setGameState"
      @deleteGameSave="deleteGameSave"
    />
  </div>
</template>

<script>
import {ax} from '@/api/defaults'
import GameControls from "@/components/GameControls";
import game from '@/mixins/game'

export default {
  name: "GameDetail",
  components: {GameControls},
  mixins: [game],
  data () {
    return {
      game: {}
    }
  },
  methods: {
    async generateTeamCodes () {
      try {
        const response = await ax.post('team/generate-codes/', {pk: this.game.pk})
        this.game.team_set = response.data
      } catch (e) {
        console.log(e)
      }
    },
    deleteGameSave (gamePk) {
      this.deleteGame(gamePk)
      this.$router.push({path: '/games'})
    },
    setGameState (gamePk, gameState) {
      this.game.game_state = gameState
    }
  },
  async mounted () {
    try {
      const response = await ax.post('game/detail/', {pk: this.$route.params.pk})
      this.game = response.data
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>

</style>