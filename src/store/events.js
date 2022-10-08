import {ax} from '@/api/defaults'

export const events = {
  state: () => ({}),
  actions: {
    async setGameState (context, gamePk, gameState) {
      try {
        await ax.post('games/set-detail-state/', {pk: gamePk, state: gameState})
      } catch (e) {
        console.log(e)
      }
    }
  },
  namespaced: true
}
