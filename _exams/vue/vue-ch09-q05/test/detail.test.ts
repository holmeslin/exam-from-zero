import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { createMemoryHistory, createRouter, RouterView } from 'vue-router'
import { expect, test } from 'vitest'
import ProductDetailView from './ProductDetailView.vue'

async function render(path: string) {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/products/:id', component: ProductDetailView }],
  })
  await router.push(path)
  await router.isReady()
  return mount({ render: () => h(RouterView) }, { global: { plugins: [router] } })
}

test('/products/2 顯示無線滑鼠', async () => {
  const w = await render('/products/2')
  expect(w.text(), '/products/2 應該顯示「無線滑鼠」（網址上的 id 是字串，記得轉成數字）').toContain('無線滑鼠')
  expect(w.text()).toContain('售價 890 元')
})

test('/products/99 顯示找不到', async () => {
  const w = await render('/products/99')
  expect(w.text(), '找不到的商品應該顯示「找不到這個商品」').toContain('找不到這個商品')
})
