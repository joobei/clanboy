import { createRouter, createWebHistory } from 'vue-router'
import MatchList from '@/components/Matchlist.vue'
import MemberList from '@/components/Memberlist.vue'
import Single_Match from '@/components/Single_Match.vue'
import Login_form from '@/components/Login.vue'
import HomePage from '@/components/Home.vue'
import DashBoard from '@/components/Dashboard.vue'
import store from '@/store/index'
import RegiStration from '@/components/Register.vue'

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
    meta: { requiredAuth: true }
  },
  {
    path: '/login',
    component: Login_form,
    meta: { requiredAuth: false }
  },
  {
    path: '/register',
    component: RegiStration,
    meta: { requiredAuth: false }
  },
  {
    path: '/memberlist',
    component: MemberList,
    meta: { requiredAuth: true }
  },
  {
    path: '/match/:id',
    component: Single_Match,
    name: "single_match",
    props: true,
    meta: { requiredAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // console.log(store.getters["auth/getAuthData"].token);
  if (!store.getters["auth/getAuthData"].token) {
      const access_token = localStorage.getItem("access_token");
      // const refresh_token = localStorage.getItem("refresh_token");
      if (access_token) {
          const data = {
              access_token: access_token,
              // refresh_token: refresh_token
          };
          store.commit('auth/saveTokenData', data.access_token);
      }
  }
  const auth = store.getters["auth/getLoginStatus"];

  if (to.fullPath == "/") {
      return next();
  }
  else if (auth && !to.meta.requiredAuth) {
      // return next({ path: "/dashboard" });
      return next();
  }
  else if (!auth && to.meta.requiredAuth) {
    store.commit('auth/updateLastMessage','You need to login before accessing this page.')
    return next({ path: '/login' });
  }

  return next();
});

export default router
