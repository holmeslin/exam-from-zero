import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { createMemoryHistory, createRouter, RouterView } from 'vue-router'
import { expect, test } from 'vitest'
import { routes } from './routes'

async function render(path: string) {
  const router = createRouter({ history: createMemoryHistory(), routes })
  await router.push(path)
  await router.isReady()
  return mount({ render: () => h(RouterView) }, { global: { plugins: [router] } })
}

test('對不到的網址顯示 404 頁面', async () => {
  const w = await render('/abc/def?x=1')
  expect(w.text(), '/abc/def?x=1 應該顯示「找不到這個頁面」').toContain('找不到這個頁面')
  expect(w.text(), '404 頁面應該顯示完整網址路徑（route.fullPath）').toContain('網址 /abc/def?x=1 不存在。')
})

test('404 路由不會搶走其他頁面', async () => {
  const w = await render('/about')
  expect(w.text(), '/about 應該還是顯示 AboutView').toContain('關於我們')
  expect(w.text()).not.toContain('找不到這個頁面')
})
