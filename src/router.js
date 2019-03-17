import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from './views/Dashboard.vue';

Vue.use(Router);
//App routes, only using a dashboard route
export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
    },
  ],
});
