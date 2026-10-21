import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import { nextTick } from 'vue'
import SearchBox from './SearchBox.vue'

beforeEach(() => vi.useFakeTimers())
afterEach(() => vi.useRealTimers())

test('快速打字只搜尋最後一次', async () => {
  const w = mount(SearchBox)
  const input = w.find('input')
  await input.setValue('v')
  vi.advanceTimersByTime(100)
  await input.setValue('vu')
  vi.advanceTimersByTime(100)
  await input.setValue('vue')
  vi.advanceTimersByTime(500)
  await nextTick()
  expect(w.find('.count').text(), '連續打三個字，停下來後只該搜尋一次').toBe('已搜尋 1 次')
  expect(w.find('.searched').text()).toBe('正在搜尋：vue')
})

test('停下來超過半秒再打，會再搜尋一次', async () => {
  const w = mount(SearchBox)
  const input = w.find('input')
  await input.setValue('a')
  vi.advanceTimersByTime(600)
  await input.setValue('ab')
  vi.advanceTimersByTime(600)
  await nextTick()
  expect(w.find('.count').text(), '每次停下超過 500 毫秒都該搜尋').toBe('已搜尋 2 次')
  expect(w.find('.searched').text()).toBe('正在搜尋：ab')
})
