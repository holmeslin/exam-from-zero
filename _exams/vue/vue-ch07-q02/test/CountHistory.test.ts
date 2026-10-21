import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import CountHistory from './CountHistory.vue'

test('count 變化時，history 要記下每一個新值', async () => {
  vi.spyOn(console, 'warn').mockImplementation(() => {})
  const w = mount(CountHistory, { props: { count: 1 } })
  await w.setProps({ count: 2 })
  await w.setProps({ count: 5 })
  expect(w.find('.history').text(), '父元件改了 count，history 應該是「2,5」；交給 composable 的是會變的東西嗎？').toBe('2,5')
  expect(w.text()).toContain('目前是 5')
})
