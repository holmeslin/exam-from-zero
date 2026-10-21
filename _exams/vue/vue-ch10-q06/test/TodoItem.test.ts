import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import TodoItem from './TodoItem.vue'

test('按「刪除」發出 remove，帶 id', async () => {
  const w = mount(TodoItem, { props: { id: 7, text: '買牛奶' } })
  await w.find('button.remove').trigger('click')
  expect(w.emitted('remove'), '按「刪除」後應發出 remove 事件，資料是 [7]').toEqual([[7]])
})

test('按「加驚嘆號」發出 rename，帶 id 與新文字', async () => {
  const w = mount(TodoItem, { props: { id: 7, text: '買牛奶' } })
  await w.find('button.rename').trigger('click')
  expect(w.emitted('rename'), '按「加驚嘆號」後應發出 rename 事件，資料是 [7, "買牛奶！"]').toEqual([[7, '買牛奶！']])
})
