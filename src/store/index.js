import { createStore } from 'vuex'
import {events} from '@/store/events'
import {games} from '@/store/games'

export default createStore({
  modules: {
    events: events,
    games: games
  }
})
