import { createStore } from "vuex";
import matchModule from './modules/matches';
import authModule from './modules/auth';
 
const store = createStore({
  modules:{
   match:matchModule,
   auth:authModule
  }
});
 
export default store;