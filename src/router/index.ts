import { createRouter, createWebHashHistory } from 'vue-router'
import { supabase } from '@/requests/supabase'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/todoList/index.vue'),
    meta: { requiresAuth: true }, // 需要登录才能访问
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/index.vue'),
  },
]

const router = createRouter({
  // 使用 Hash 模式，GitHub Pages 刷新不会 404
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.meta.requiresAuth

  if (!requiresAuth) {
    return next()
  }

  // 获取当前 session
  const { data: { session }, error } = await supabase.auth.getSession()

  if (error) {
    console.error('获取 session 出错', error.message)
    return next('/login')
  }

  if (!session) {
    // 没有登录
    return next('/login')
  }

  // 已经登录
  next()
})

export default router
