import { flushPromises, mount } from '@vue/test-utils'
import { h } from 'vue'
import { createMemoryHistory, createRouter, RouterView } from 'vue-router'
import { expect, test } from 'vitest'
import { routes } from './routes'

const find = (path: string) => routes.find((r) => r.path === path)!

test('/about 改成延遲載入，首頁維持一般匯入', () => {
  expect(typeof find('/about').component, '/about 的 component 應該是 () => import(...) 這樣的函式').toBe('function')
  expect(typeof find('/').component, '首頁要維持一般匯入，component 是元件物件，不是函式').toBe('object')
})

test('延遲載入的頁面照樣能顯示', async () => {
  const router = createRouter({ history: createMemoryHistory(), routes })
  await router.push('/about')
  await router.isReady()
  const w = mount({ render: () => h(RouterView) }, { global: { plugins: [router] } })
  await flushPromises()
  expect(w.text(), '進 /about 應該顯示「關於我們」').toContain('關於我們')
})
