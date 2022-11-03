import {backendHost} from "@/api/defaults";

const secretKey = 'django-secret-token'


export const game = {
  state: () => ({
    gameSocket: false
  }),
  getters: {},
  mutations: {
    setGameSocket(state, gameSocket) {
      state.gameSocket = gameSocket
    }
  },
  actions: {
    makeGameSocket({commit}, gamePk) {
      const gameSocket = new WebSocket(
        `ws://${backendHost}/game-socket/${gamePk}/${secretKey}/`,
      )
      commit('setGameSocket', gameSocket)
      gameSocket.onclose = (e) => {console.log(e)}
    },
    changeGameState ({commit}, eventData) {

    }
  },
  namespaced: true
}
