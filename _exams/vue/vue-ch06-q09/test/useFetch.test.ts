import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import { defineComponent, h, ref, type Ref } from 'vue'
import { useFetch } from './useFetch'

const calls: string[] = []

beforeEach(() => {
  calls.length = 0
  vi.stubGlobal('fetch', async (url: string) => {
    calls.push(String(url))
    return { ok: true, status: 200, json: async () => ({ url: String(url) }) }
  })
})
afterEach(() => vi.unstubAllGlobals())

function host(source: unknown) {
  return mount(
    defineComponent({
      setup() {
        const { data } = useFetch(source as string)
        return () => h('p', data.value ? data.value.url : '')
      },
    }),
  )
}

test('傳普通字串會抓一次', async () => {
  const w = host('/users/1')
  await flushPromises()
  expect(calls).toEqual(['/users/1'])
  expect(w.text()).toBe('/users/1')
})

test('傳 getter，值改變時重新抓', async () => {
  const id = ref(1)
  const w = host(() => `/users/${id.value}`)
  await flushPromises()
  expect(calls, '傳 getter 時，要呼叫它拿到網址').toEqual(['/users/1'])
  id.value = 2
  await flushPromises()
  expect(calls, 'getter 讀到的 id 變了，要用新網址再抓一次').toEqual(['/users/1', '/users/2'])
  expect(w.text()).toBe('/users/2')
})

test('傳 ref，值改變時重新抓', async () => {
  const url: Ref<string> = ref('/posts/1')
  const w = host(url)
  await flushPromises()
  expect(calls, '傳 ref 時，要讀它的 .value 當網址').toEqual(['/posts/1'])
  url.value = '/posts/2'
  await flushPromises()
  expect(calls).toEqual(['/posts/1', '/posts/2'])
  expect(w.text()).toBe('/posts/2')
})
