import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Profile from './Profile.vue'

test('按「清空」後輸入框和文字都清空', async () => {
  const w = mount(Profile)
  await w.find('input.name').setValue('小明')
  await w.find('input.city').setValue('台中')
  expect(w.find('p').text()).toBe('小明 住在 台中')
  await w.find('button').trigger('click')
  expect(w.find('p').text(), '按了清空，畫面沒有變：把 reactive 變數整個換掉，Vue 不知道').toBe('住在')
  expect((w.find('input.name').element as HTMLInputElement).value, '名字輸入框應該被清空').toBe('')
  await w.find('input.city').setValue('高雄')
  expect(w.find('p').text(), '清空後再輸入，畫面應該還會跟著更新').toBe('住在 高雄')
})
