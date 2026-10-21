import { flushPromises, mount } from '@vue/test-utils'
import { h } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import { expect, test } from 'vitest'
import NavBar from './NavBar.vue'

async function setup(path: string) {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: { render: () => h('h1', '首頁') } },
      { path: '/about', component: { render: () => h('h1', '關於我們') } },
    ],
  })
  await router.push(path)
  await router.isReady()
  const w = mount(NavBar, { global: { plugins: [router] } })
  const link = (text: string) => w.findAll('a').find((a) => a.text() === text)!
  return { router, link }
}

test('在 /about 時，「關於」連結被標成目前頁面', async () => {
  const { link } = await setup('/about')
  expect(link('關於').classes(), '「關於」連結應該有 router-link-exact-active（要用 RouterLink）').toContain('router-link-exact-active')
  expect(link('首頁').classes(), '「首頁」連結在 /about 時不該是 exact-active').not.toContain('router-link-exact-active')
})

test('點連結會換頁', async () => {
  const { router, link } = await setup('/about')
  await link('首頁').trigger('click')
  await flushPromises()
  expect(router.currentRoute.value.path, '點「首頁」之後網址應該變成 /').toBe('/')
})
