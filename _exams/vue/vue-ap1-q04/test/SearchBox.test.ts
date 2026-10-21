import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import SearchBox from './SearchBox.vue'

test('掛載後輸入框就取得焦點', () => {
  const w = mount(SearchBox, { attachTo: document.body })
  expect(document.activeElement, '掛載後焦點應該在 <input> 上').toBe(w.find('input').element)
  w.unmount()
})
