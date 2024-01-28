
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/log', component: () => import('../pages/CatchLog.vue') },
      { path: '/stats', component: () => import('../pages/Statistics.vue') },
      { path: '', component: () => import('pages/IndexPage.vue') },
    ]
  },


  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
