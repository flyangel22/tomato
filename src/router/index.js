// Composables
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
    meta: {
      title: '首頁 | 番茄鐘'
    }
  }, {
    path: '/list',
    component: () => import(/* webpackChunkName: "list" */ '@/views/List.vue'),
    meta: {
      title: '事項 | 番茄鐘'
    }
  },
  {
    path: '/settings',
    component: () => import(/* webpackChunkName: "settings" */ '@/views/Settings.vue'),
    meta: {
      title: '設定 | 番茄鐘'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})

export default router
