import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home'
import UserGames from "@/views/UserGames";
import CodeInput from "@/views/CodeInput";
import GameDetail from "@/views/GameDetail";
import GameEdit from "@/views/GameEdit";

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/games',
    component: UserGames
  },
  {
    path: '/code-input',
    component: CodeInput
  },
  {
    path: '/game/:pk',
    component: GameDetail
  },
  {
    path: '/game/:pk/edit',
    component: GameEdit
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
