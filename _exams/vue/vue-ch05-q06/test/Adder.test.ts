import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Adder from './Adder.vue'

test('輸入 1 和 2 得到 3', async () => {
  const w = mount(Adder)
  await w.find('input.a').setValue('1')
  await w.find('input.b').setValue('2')
  expect(w.find('p').text(), '得到的是「= 12」嗎？輸入框拿到的是字串，要先轉成數字').toBe('= 3')
})

test('輸入 10 和 25 得到 35', async () => {
  const w = mount(Adder)
  await w.find('input.a').setValue('10')
  await w.find('input.b').setValue('25')
  expect(w.find('p').text()).toBe('= 35')
})
