import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Hooks from '../views/Hooks.vue'
import Axios from '../views/Axios.vue'
import State from '../views/State.vue'
import MultiStore from '../views/MultiStore.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/hooks',
    name: 'Hooks',
    component: Hooks
  },
  {
    path: '/axios',
    name: 'Axios',
    component: Axios
  },
  {
    path: '/state',
    name: 'State',
    component: State
  },
  {
    path: '/multistore',
    name: 'MultiStore',
    component: MultiStore
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
