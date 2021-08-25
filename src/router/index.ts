import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Hooks from '../views/Hooks.vue'
import Axios from '../views/Axios.vue'
import State from '../views/State.vue'
import MultiStore from '../views/MultiStore.vue'
import Leaflet from '../views/Leaflet.vue'
import Proj4js from '../views/Proj4js.vue'

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
  {
    path: '/leaflet',
    name: 'Leaflet',
    // component: import(/* webpackChunkName: "leaflet" */ '../views/Leaflet.vue'),
    component: Leaflet
  },
  {
    path: '/proj4js',
    name: 'Proj4js',
    // component: import(/* webpackChunkName: "leaflet" */ '../views/Leaflet.vue'),
    component: Proj4js
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
