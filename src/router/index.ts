import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Hooks from '../views/Hooks.vue'
import Axios from '../views/Axios.vue'
import State from '../views/State.vue'
import MultiStore from '../views/MultiStore.vue'
// import Leaflet from '../views/Leaflet.vue'
import Proj4js from '../views/Proj4js.vue'
import Routes from '../views/Routes.vue'

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
    component: ()=>import(/* webpackChunkName: "leaflet" */ '../views/Leaflet.vue'),
    // component: Leaflet
  },
  {
    path: '/proj4js',
    name: 'Proj4js',
    // component: import(/* webpackChunkName: "leaflet" */ '../views/Leaflet.vue'),
    component: Proj4js
  },
  {
    path: '/routes',
    name: 'Routes',
    component: Routes,
    children:[
      {
        path: 'profile',
        name: 'profile',
        component: ()=>import(/* webpackChunkName: "profile" */ '../subviews/Child1View.vue')
      },
      {
        path: 'orderinfo',
        name: 'orderinfo',
        component: ()=>import(/* webpackChunkName: "orderinfo" */ '../subviews/Child2View.vue')
      },
      {
        path: 'mapinfo/:x/:y',
        name: 'mapinfo',
        component: ()=>import(/* webpackChunkName: "mapinfo" */ '../subviews/Child3View.vue')
      },
      {
        path: 'helpcenter/:who/:question',
        name: 'helpcenter',
        component: ()=>import(/* webpackChunkName: "helpcenter" */ '../subviews/Child4View.vue')
      },
      {
        path: 'payment/:cardno/:pay',
        name: 'payment',
        props: true, //會把所有收到params的參數丟到props裡
        component: ()=>import(/* webpackChunkName: "payment" */ '../subviews/Child5View.vue')
      },
      {
        path: 'contact',
        name: 'contact',
        props: (route)=>{
          return{
            email : route.query.email,
            fax : route.query.fax
          }
        },
        component: ()=>import(/* webpackChunkName: "contact" */ '../subviews/Child6View.vue')
      },
      {
        path: 'favorite/:favname/:favpath',
        name: 'favorite',
        props: true,
        component: ()=>import(/* webpackChunkName: "favorite" */ '../subviews/Child7View.vue')
      },
      {
        path: 'online',
        name: 'online',
        component: ()=>import(/* webpackChunkName: "online" */ '../subviews/Child8View.vue')
      },
      {
        path: 'database',
        name: 'database',
        meta: {isAuth : true},
        component: ()=>import(/* webpackChunkName: "database" */ '../subviews/Child9View.vue'),
        children:[
          {
            path: 'content1',
            name: 'content1',
            beforeEnter: (to,from)=>{
              if(sessionStorage.getItem('role') != 'admin'){
                alert('Routing Guard: 須要有admin權限\n( 請設定sessionStorage[ role=admin ] )')
                return false
              }
            },
            component: ()=>import(/* webpackChunkName: "content1" */ '../subviews/Content1View.vue')
          },
          {
            path: 'content2',
            name: 'content2',
            meta: {errmsg: '讀取資料失敗'},
            component: ()=>import(/* webpackChunkName: "content2" */ '../subviews/Content2View.vue')
          },
          {
            path: 'content3',
            name: 'content3',
            component: ()=>import(/* webpackChunkName: "content3" */ '../subviews/Content3View.vue')
          }
        ]
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//全域的Router Guard
//在每一次導航前執行( component 還沒被mount前)
router.beforeEach((to,from)=>{
  if(to.meta.isAuth){ //如果有設定要檢查權限
    if(sessionStorage.getItem('account') != 'admin'){
      alert('Global Routing Guard: 須要有admin帳號\n( 請設定sessionStorage[ account=admin ] )')
      return false
    } 
  }
})
//在每一次成功導行之後執行
router.afterEach((to,from)=>{
  document.title = to.name as string || ''
})

export default router
