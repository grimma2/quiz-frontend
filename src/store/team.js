import {ax, backendHost} from "@/api/defaults";

export const team = {
  state: () => ({
    teamSocket: false,
    gameState: 'OFF',
    activeQuestion: {},
    leaderBoard: {}
  }),
  getters: {},
  mutations: {
    setTeamSocket (state, teamSocket) {
      state.teamSocket = teamSocket
    },
    setActiveQuestion (state, activeQuestion) {
      state.leaderBoard = {}
      state.activeQuestion = activeQuestion
    },
    setLeaderBoard (state, leaderBoard) {
      state.activeQuestion = {}
      state.leaderBoard = leaderBoard
    },
    setGameState (state, gameState) {
      state.gameState = gameState
    }
  },
  actions: {
    makeTeamSocket ({commit}, code) {
      const teamSocket = new WebSocket(`ws://${backendHost}/team-socket/${code}/`)
      teamSocket.onclose = (e) => {console.log(e)}
      commit('setTeamSocket', teamSocket)
    },
    async fetchLeaderBoard ({commit}, code) {
      console.log(`fetchLeaderBoard... code ${code}`)
      try {
        const response = await ax.post('game/get-leader-board/', {code: code})
        commit('setLeaderBoard', response.data)
      } catch (e) {
        console.log(e)
      }
    },
    async fetchQuestion ({commit}, code) {
      try {
        const response = await ax.post('team/get-active-question/', {code: code})
        commit('setActiveQuestion', response.data)
      } catch (e) {
        console.log(e)
      }
    },
    changeGameState ({commit, dispatch}, {eventData, code}) {
      console.log(`state: ${eventData}, code: ${code}`)
      if (eventData === 'OFF') {
        dispatch('fetchLeaderBoard', code)
      } else if (eventData === 'ON') {
        document.cookie = 'inGame=1; expires=Fri, 31 Dec 9999 23:59:59 GMT'
        dispatch('fetchQuestion', code)
      }
      commit('setGameState', eventData)
    },
    nextQuestion ({commit}, {eventData, code}) {
      console.log('nextQuestion action')
      if (eventData.correct_answers) {
        // if 'eventData' has this property then 'eventData' this question
        // esle this leader_board
        commit('setActiveQuestion', eventData)
      } else {
        commit('setLeaderBoard', eventData)
      }
    },
    updateLeaderBoard ({commit}, {eventData, code}) {
      console.log('updateLeaderBoard action')
      commit('setLeaderBoard', eventData)
    },
    sendNextQuestion ({state}) {
      state.teamSocket.send(JSON.stringify({
        type: 'next_question'
      }))
    }
  },
  namespaced: true
}