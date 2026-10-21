import type { RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from './auth'

export function authGuard(to: RouteLocationNormalized) {
  // TODO: 要去的頁面 meta.requiresAuth 為 true 且還沒登入時，
  // 改去 /login，並把原本要去的完整網址放進查詢參數 redirect
}
