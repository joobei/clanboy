import { createRouter, createWebHistory } from 'vue-router'
import MatchList from '@/components/Matchlist.vue'
import Single_Match from '@/components/Single_Match.vue'
import HomePage from '@/components/Home.vue'
import DashBoard from '@/components/Dashboard.vue'
import store from '@/store/index'
import Discord_ from '@/components/DisCord.vue'
import NotFound from '@/components/not_found.vue'

const routes = [
  {
    path: '/',
    component: HomePage,
    meta: { requiredAuth: false }
  },
  {
    path: '/dashboard',
    component: DashBoard,
    meta: { requiredAuth: true }
  },
  {
    path: '/matchlist',
    component: MatchList,
    meta: { requiredAuth: false }
  },
  {
    path: '/discord',
    component: Discord_,
    meta: { requiredAuth: false }
  },
  {
    path: '/match/:id',
    component: Single_Match,
    name: "single_match",
    props: true,
    meta: { requiredAuth: false }
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
    meta: { requiredAuth: false }
  }
]

const router = createRouter({
  history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
  //fetch if user is logged in
  var auth = store.getters["auth/userIsLoggedIn"];
  if (!auth) {
    store.dispatch('auth/recover_token_from_local_storage');
    auth = store.getters["auth/userIsLoggedIn"];
  }

  if (auth && !to.meta.requiredAuth) {
    return next();
  }
  else if (!auth && to.meta.requiredAuth) {
    store.commit('auth/updateLastMessage', 'You need to login before accessing this page.')
    return next({ path: '/' });
  }

  return next();
});

export default router
