import { flushPromises, mount } from '@vue/test-utils'
import { h } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import { expect, test } from 'vitest'
import GoToProduct from './GoToProduct.vue'

async function setup() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: GoToProduct },
      { path: '/products/:id', name: 'product', component: { render: () => h('h1', '商品頁') } },
    ],
  })
  await router.push('/')
  await router.isReady()
  const w = mount(GoToProduct, { global: { plugins: [router] } })
  return { router, w }
}

test('輸入編號後送出會換頁', async () => {
  const { router, w } = await setup()
  await w.find('input').setValue('3')
  await w.find('form').trigger('submit')
  await flushPromises()
  expect(router.currentRoute.value.fullPath, '輸入 3 按「前往」後網址應該是 /products/3').toBe('/products/3')
})

test('沒輸入時不換頁', async () => {
  const { router, w } = await setup()
  await w.find('form').trigger('submit')
  await flushPromises()
  expect(router.currentRoute.value.fullPath, '沒輸入編號時應該留在 /').toBe('/')
})
