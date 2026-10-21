import { flushPromises, mount } from '@vue/test-utils'
import { h } from 'vue'
import { createMemoryHistory, createRouter, RouterView } from 'vue-router'
import { expect, test } from 'vitest'
import ProductsView from './ProductsView.vue'

async function setup(path: string) {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/products', component: ProductsView }],
  })
  await router.push(path)
  await router.isReady()
  const w = mount({ render: () => h(RouterView) }, { global: { plugins: [router] } })
  const names = () => w.findAll('li').map((li) => li.text())
  return { router, w, names }
}

test('沒有查詢參數時顯示全部', async () => {
  const { w, names } = await setup('/products')
  expect(w.text()).toContain('目前分類：all')
  expect(names(), '/products 應該列出全部 4 個商品').toHaveLength(4)
})

test('依 category 篩選', async () => {
  const { w, names } = await setup('/products?category=mouse')
  expect(w.text(), '/products?category=mouse 應該顯示「目前分類：mouse」').toContain('目前分類：mouse')
  expect(names(), '只該列出兩支滑鼠').toEqual(['無線滑鼠', '人體工學滑鼠'])
})

test('網址的查詢參數變了，列表跟著變', async () => {
  const { router, names } = await setup('/products?category=mouse')
  await router.push('/products?category=keyboard')
  await flushPromises()
  expect(names(), '換到 ?category=keyboard 後應該只剩鍵盤').toEqual(['機械鍵盤', '60% 小鍵盤'])
})

test('分類連結保留其他查詢參數', async () => {
  const { w } = await setup('/products?sort=price')
  const link = w.findAll('a').find((a) => a.text() === 'mouse')!
  const href = link.attributes('href')!
  expect(href, '「mouse」連結應該保留原本的 sort=price').toContain('sort=price')
  expect(href).toContain('category=mouse')
})
