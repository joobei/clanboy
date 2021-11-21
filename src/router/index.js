import { createRouter, createWebHistory } from 'vue-router'
import MatchList from '../components/Matchlist.vue'
import MemberList from '../components/Memberlist.vue'
import Single_Match from '../components/Single_Match.vue'


const routes = [
  {
    path: '/matchlist',
    component: MatchList
  },
  {
    path: '/memberlist',
    component: MemberList
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../vue')
  },
  { 
    path:'/match/:date',
    component: Single_Match,
    name: "single_match",
    props:true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
