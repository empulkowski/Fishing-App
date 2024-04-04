import { route } from 'quasar/wrappers';
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router';
import routes from './routes';
import CatchLog from 'src/pages/CatchLog.vue';
import IndexPage from 'src/pages/IndexPage.vue';
import FishSearch from 'src/pages/FishSearch.vue';

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes: [
      ...routes,
      {
        path: '/home',
        name: 'Home',
        component: IndexPage,
      },
      {
        path: '/catch-log',
        name: 'CatchLog',
        component: CatchLog,
      },
      {
        path: '/fishsearch',
        name: 'FishSearch',
        component: FishSearch,
      },
    ],

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  return Router;
});
