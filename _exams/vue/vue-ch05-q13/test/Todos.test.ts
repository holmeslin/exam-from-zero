import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Todos from './Todos.vue'

test('勾選後未完成數量自動更新', async () => {
  const w = mount(Todos)
  expect(w.find('p').text()).toBe('還有 2 項未完成')
  await w.findAll('input[type="checkbox"]')[1].setValue(true)
  expect(w.find('p').text(), '勾了「寫作業」，數量沒有變：算得出來的值要用 computed').toBe('還有 1 項未完成')
})

test('清除已完成，沒有已完成時按鈕消失', async () => {
  const w = mount(Todos)
  await w.find('button').trigger('click')
  const titles = w.findAll('li').map((li) => li.text())
  expect(titles, '按了「清除已完成」，應該只剩未完成的事項').toEqual(['寫作業', '倒垃圾'])
  expect(w.find('button').exists(), '沒有已完成的事項時，「清除已完成」按鈕不該出現').toBe(false)
  await w.findAll('input[type="checkbox"]')[0].setValue(true)
  expect(w.find('button').exists(), '又勾了一項，按鈕應該出現').toBe(true)
  expect(w.find('p').text()).toBe('還有 1 項未完成')
})
