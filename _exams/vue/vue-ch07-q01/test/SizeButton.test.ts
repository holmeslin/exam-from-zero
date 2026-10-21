import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import SizeButton from './SizeButton.vue'

test('沒給 size 時預設為 md', () => {
  const w = mount(SizeButton, { props: { label: '按鈕' } })
  expect(w.text(), '沒給 size 時應該顯示「按鈕（md）」').toBe('按鈕（md）')
  expect(w.find('button').classes(), '沒給 size 時 class 應該是 md').toContain('md')
})

test('有給 size 時用傳進來的值，而且會跟著變', async () => {
  const w = mount(SizeButton, { props: { label: '大', size: 'lg' } })
  expect(w.text()).toBe('大（lg）')
  await w.setProps({ size: 'sm' })
  expect(w.text(), 'size 改成 sm 後畫面要跟著更新').toBe('大（sm）')
  expect(w.find('button').classes()).toContain('sm')
})
