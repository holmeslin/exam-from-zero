import { flushPromises, mount } from '@vue/test-utils'
import { h } from 'vue'
import { createMemoryHistory, createRouter, RouterView } from 'vue-router'
import { beforeEach, expect, test } from 'vitest'
import ProductDetailView from './ProductDetailView.vue'

beforeEach(() => {
  document.title = ''
})

async function setup() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/products/:id', component: ProductDetailView }],
  })
  await router.push('/products/1')
  await router.isReady()
  const w = mount({ render: () => h(RouterView) }, { global: { plugins: [router] } })
  return { router, w }
}

test('第一次進頁面就設定標題', async () => {
  const { w } = await setup()
  expect(w.text()).toContain('機械鍵盤')
  expect(document.title, '第一次進 /products/1 時，document.title 就應該是「商品 1」（watch 要加 immediate）').toBe('商品 1')
})

test('換參數時畫面和標題跟著換', async () => {
  const { router, w } = await setup()
  await router.push('/products/2')
  await flushPromises()
  expect(w.text(), '從 /products/1 換到 /products/2 後應該顯示「無線滑鼠」（product 要用 computed）').toContain('無線滑鼠')
  expect(w.text()).toContain('售價 890 元')
  expect(document.title, '換到 /products/2 後 document.title 應該是「商品 2」').toBe('商品 2')
})
