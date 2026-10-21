import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import SearchBox from './SearchBox.vue'

test('掛載後輸入框自動取得焦點', () => {
  const w = mount(SearchBox, { attachTo: document.body })
  expect(document.activeElement, '掛載後 document.activeElement 應該是那個 <input>').toBe(w.find('input').element)
  w.unmount()
})

test('輸入的文字會顯示在 <p> 裡', async () => {
  const w = mount(SearchBox)
  await w.find('input').setValue('鍵盤')
  expect(w.find('p').text(), '輸入「鍵盤」後，<p> 應顯示「鍵盤」').toBe('鍵盤')
})

test('按 Enter 發出 search，按其他鍵不發出', async () => {
  const w = mount(SearchBox)
  await w.find('input').setValue('滑鼠')
  await w.find('input').trigger('keydown', { key: 'a' })
  expect(w.emitted('search'), '按 a 鍵不應發出 search').toBeUndefined()
  await w.find('input').trigger('keydown', { key: 'Enter' })
  expect(w.emitted('search'), '按 Enter 後應發出 search，資料是 ["滑鼠"]').toEqual([['滑鼠']])
})
