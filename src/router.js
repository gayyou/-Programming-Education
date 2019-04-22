import Vue from 'vue'
import Router from 'vue-router'
import index from './views/index.vue'
import recommand from './views/recommand.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/recommand',
      name: 'recommand',
      component: recommand
    }
  ]
});