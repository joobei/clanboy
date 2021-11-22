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
  },
  { 
    path:'/match/:id',
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
