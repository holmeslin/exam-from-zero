import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import HCounter from './HCounter'

test('點兩下顯示「點了 2 次」', async () => {
  const w = mount(HCounter)
  expect(w.find('button').exists(), '應該渲染一個 <button>').toBe(true)
  expect(w.text(), '一開始應該顯示「點了 0 次」').toBe('點了 0 次')
  await w.find('button').trigger('click')
  await w.find('button').trigger('click')
  expect(w.text(), '點兩下之後應該顯示「點了 2 次」；文字有在 render function 裡面算嗎？').toBe('點了 2 次')
})
