import { createStore } from 'vuex'
import {team} from '@/store/team'
import {game} from '@/store/game'

export default createStore({
  modules: {
    team: team,
    game: game
  }
})
