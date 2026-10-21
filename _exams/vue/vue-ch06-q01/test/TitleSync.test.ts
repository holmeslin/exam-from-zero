import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import TitleSync from './TitleSync.vue'

test('一掛載就同步標題，之後跟著輸入框變', async () => {
  document.title = ''
  const w = mount(TitleSync)
  expect(document.title, '元件一建立，分頁標題就該是「我的筆記」').toBe('我的筆記')
  await w.find('input').setValue('購物清單')
  expect(document.title, '輸入框改了，分頁標題也要跟著改').toBe('購物清單')
})
