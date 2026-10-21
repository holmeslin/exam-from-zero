import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import { nextTick } from 'vue'
import Ticker from './Ticker.vue'

beforeEach(() => vi.useFakeTimers())
afterEach(() => vi.useRealTimers())

test('掛載後每秒加 1', async () => {
  const w = mount(Ticker)
  vi.advanceTimersByTime(3000)
  await nextTick()
  expect(w.text(), '過了 3 秒，畫面該顯示 3').toBe('已經過 3 秒')
})

test('卸載後計時器要停掉', () => {
  const w = mount(Ticker)
  expect(vi.getTimerCount(), '掛載後應該有一個計時器在跑').toBe(1)
  w.unmount()
  expect(vi.getTimerCount(), '元件卸載了，計時器還在跑：記得在 onUnmounted 裡 clearInterval').toBe(0)
})
