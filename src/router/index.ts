import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/publications',
    name: 'Publications',
    component: () => import('../views/Publications.vue'),
  },
  {
    path: '/publications/:filter/:id',
    name: 'StudentPublications',
    component: () => import('../views/Publications.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
