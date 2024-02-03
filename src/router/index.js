import Vue       from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/home.vue')
    },
    {
      path: '/learners-list',
      name: 'learners-list',
      component: () => import('../views//learners-list/LearnersList.vue')
    },
    {
      path: '/results-list',
      name: 'results-list',
      component: () => import('../views/results-list/ResultsList.vue')
    }
  ]
});

export default router;
