import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import SignupForm from './SignupForm.vue'

const disabled = (w: ReturnType<typeof mount>) => w.find('button').element.hasAttribute('disabled')

test('一開始什麼都沒填，送出按鈕是停用的', () => {
  const w = mount(SignupForm)
  expect(disabled(w), '表單是空的時，按鈕應該是 disabled').toBe(true)
})

test('少填任何一項都不能送出', async () => {
  const w = mount(SignupForm)
  await w.find('input.email').setValue('ming@example.com')
  await w.find('input.agree').setValue(true)
  expect(disabled(w), 'age 還是 null 時，按鈕應該是 disabled').toBe(true)
  await w.find('input.age').setValue('20')
  await w.find('input.email').setValue('ming')
  expect(disabled(w), 'email 沒有 @ 時，按鈕應該是 disabled').toBe(true)
})

test('三項都填好才能送出', async () => {
  const w = mount(SignupForm)
  await w.find('input.email').setValue('ming@example.com')
  await w.find('input.age').setValue('20')
  await w.find('input.agree').setValue(true)
  expect(disabled(w), 'email 有 @、age 有填、勾了同意時，按鈕應該可以按').toBe(false)
})
