import IndexPage from "pages/IndexPage.vue";
import CatchLog from "pages/CatchLog.vue";
import FishSearch from "pages/FishSearch.vue";

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/friend-log/:friendId',
        name: 'friend-log',
        component: () => import('../pages/FriendLog.vue'),
        props: true
      },
      { path: '/log', component: () => import('../pages/CatchLog.vue') },
      //{ path: '/stats', component: () => import('../pages/Statistics.vue') },
      { path: '/login', component: () => import('components/UserLogin.vue') },
      { path: '/register', component: () => import('components/UserRegister.vue') },
      { path: '', component: () => import('pages/IndexPage.vue') },
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
        path: '/fish-search',
        name: 'FishSearch',
        component: FishSearch,
      },
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
