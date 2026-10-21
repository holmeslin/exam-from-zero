import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import UserCard from './UserCard.vue'

test('沒傳 age 時預設 18 歲', () => {
  const w = mount(UserCard, { props: { name: '小明' } })
  expect(w.text(), '只傳 name 時應顯示「小明，18 歲」').toBe('小明，18 歲')
})

test('有傳 age 時顯示傳入的歲數', () => {
  const w = mount(UserCard, { props: { name: '小華', age: 20 } })
  expect(w.text(), '傳 age=20 時應顯示「小華，20 歲」').toBe('小華，20 歲')
})
