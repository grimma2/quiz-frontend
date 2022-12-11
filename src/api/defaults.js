import axios from 'axios'


export const backendHost = 'localhost:8000'

export const ax = axios.create({
  baseURL: `${location.protocol}//${backendHost}/api/v1/`,
  withCredentials: true
})


export const teamSocketEvents = {
  'next_question': 'team/nextQuestion',
  'change_state': 'team/changeGameState',
  'update_leader_board': 'team/updateLeaderBoard'
}

export const gameSocketEvents = {
  'change_state': 'game/changeGameState'
}
