import { createPinia, setActivePinia } from 'pinia'
import { h } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import { beforeEach, expect, test } from 'vitest'
import { useAuthStore } from './auth'
import { authGuard } from './guard'

const page = (text: string) => ({ render: () => h('h1', text) })

function makeRouter() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: page('首頁') },
      { path: '/about', component: page('關於') },
      { path: '/account', component: page('帳號'), meta: { requiresAuth: true } },
      { path: '/login', component: page('登入') },
    ],
  })
  router.beforeEach(authGuard)
  return router
}

beforeEach(() => {
  setActivePinia(createPinia())
})

test('沒登入去 /account 會被送去登入頁', async () => {
  const router = makeRouter()
  await router.push('/account?tab=orders')
  const route = router.currentRoute.value
  expect(route.path, '沒登入時進 /account 應該改去 /login').toBe('/login')
  expect(route.query.redirect, 'redirect 應該是原本要去的完整網址（to.fullPath）').toBe('/account?tab=orders')
})

test('登入後可以進 /account', async () => {
  const router = makeRouter()
  useAuthStore().login('小明')
  await router.push('/account')
  expect(router.currentRoute.value.path, '已登入時應該放行到 /account').toBe('/account')
})

test('不需要登入的頁面直接放行', async () => {
  const router = makeRouter()
  await router.push('/about')
  expect(router.currentRoute.value.path, '/about 沒有 requiresAuth，應該放行').toBe('/about')
})
