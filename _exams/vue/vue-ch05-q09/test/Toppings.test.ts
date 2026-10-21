import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Toppings from './Toppings.vue'

test('勾選的配料用「、」接起來顯示', async () => {
  const w = mount(Toppings)
  const boxes = w.findAll('input[type="checkbox"]')
  expect(boxes.length, '應該有三個勾選框').toBe(3)
  await boxes[0].setValue(true)
  await boxes[1].setValue(true)
  expect(w.find('p').text(), '勾了起司和培根：一組勾選框要綁到同一個陣列').toBe('已選：起司、培根')
  await boxes[0].setValue(false)
  expect(w.find('p').text(), '取消起司後只剩培根').toBe('已選：培根')
})
