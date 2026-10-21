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

test('/ 顯示首頁', async () => {
  const w = await render('/')
  expect(w.text(), '網址是 / 時應該顯示 HomeView').toContain('首頁')
})

test('/about 顯示關於我們', async () => {
  const w = await render('/about')
  expect(w.text(), '網址是 /about 時應該顯示 AboutView（「關於我們」）').toContain('關於我們')
})
