import { createStore } from "vuex";
import matchModule from './modules/matches';
import authModule from './modules/auth';
 
const store = createStore({
  modules:{
   matches:matchModule,
   auth:authModule
  },
  strict: true
});
 
export default store;