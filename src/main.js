import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faGithub);

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

//Initalizing vue app inside #app id on @public/index.html
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
