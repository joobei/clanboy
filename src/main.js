import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

import { library } from "@fortawesome/fontawesome-svg-core";
import { faHouse, faRightToBracket, faGauge, faList, faBank } from "@fortawesome/free-solid-svg-icons";
library.add(faHouse);
library.add(faRightToBracket);
library.add(faGauge);
library.add(faList);
library.add(faBank);

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

createApp(App)
.component("font-awesome-icon", FontAwesomeIcon)
.use(router)
.use(store)
.mount('#app')