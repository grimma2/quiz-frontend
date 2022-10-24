<template>
  <div class="team-play">
    <leader-board
      :leader-board="$store.state.team.leaderBoard"
      v-if="!objectIsEmpty($store.state.team.leaderBoard)"
    />
    <active-question
      :question="$store.state.team.activeQuestion"
      v-else-if="!objectIsEmpty($store.state.team.activeQuestion)"
    />
    <p class="not-in-game" v-else>Организатор пока что ещё не запустил игру</p>
  </div>
</template>

<script>
import {ax, teamSocketEvents} from "@/api/defaults";

import cookie from "@/mixins/cookie";
import objectIsEmpty from "@/mixins/objectIsEmpty";

import ActiveQuestion from "@/components/ActiveQuestion";
import LeaderBoard from "@/components/LeaderBoard";

export default {
  name: "TeamPlay",
  components: {LeaderBoard, ActiveQuestion},
  mixins: [cookie, objectIsEmpty],
  methods: {
    socketIsValid(socket) {
      console.log(socket)
      setTimeout(() => {
        if (!socket.readyState) {
          this.$router.push({path: '/code-input'})
        }
      }, 1000)
    },
    async setQuestionOrBoard () {
      console.log('setQuestionOrBoard...')
      try {
        const response = await ax.post('team/get-data/', {code: this.$route.params.code})
        console.log(response.data)
        if (response.data.active_question) {
          this.$store.commit('team/setActiveQuestion', response.data.active_question)
        } else if (response.data.leader_board) {
          this.$store.commit('team/setLeaderBoard', response.data.leader_board)
        }
        this.$store.commit('team/setGameState', response.data.game_state)
      } catch (e) {
        console.log(e)
      }
    },
    setListeners (socket) {
      socket.onmessage = (e) => {
        let data = JSON.parse(e.data)

        let action = teamSocketEvents[data['event']]
        this.$store.dispatch(
          action,
          {
            eventData: data['event_data'],
            code: this.$route.params.code
          }
        )
      }
    }
  },
  mounted () {
    this.$store.dispatch('team/makeTeamSocket', this.$route.params.code)
    let socket = this.$store.state.team.teamSocket
    this.socketIsValid(socket)

    if (this.cookiesIsExists('inGame')) this.setQuestionOrBoard()

    this.setListeners(socket)
  }
}
</script>

<style scoped>

</style>