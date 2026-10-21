import type { RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from './auth'

export function authGuard(to: RouteLocationNormalized) {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }
}
