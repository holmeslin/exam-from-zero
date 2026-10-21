import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import TabsDemo from './TabsDemo.vue'

test('筆記分頁保留內容，計數器每次切回來歸零', async () => {
  const w = mount(TabsDemo)
  for (let i = 0; i < 3; i++) await w.find('button.count').trigger('click')
  expect(w.find('button.count').text()).toBe('按了 3 次')

  await w.find('button.to-notes').trigger('click')
  await w.find('textarea').setValue('買牛奶')

  await w.find('button.to-counter').trigger('click')
  expect(w.find('button.count').text(), '計數器不應該被保留，切回來要是「按了 0 次」').toBe('按了 0 次')

  await w.find('button.to-notes').trigger('click')
  expect((w.find('textarea').element as HTMLTextAreaElement).value, '筆記分頁切回來時，剛剛打的字要還在').toBe('買牛奶')
})
