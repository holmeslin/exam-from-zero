import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import ProgressBar from './ProgressBar.vue'

test('寬度要加上 % 單位', () => {
  const w = mount(ProgressBar, { props: { progress: 70 } })
  const fill = w.find('.bar-fill').element as HTMLElement
  expect(fill.style.width, 'progress 是 70 時，寬度應該是 70%').toBe('70%')
})

test('未滿 100 時只有 bar class', () => {
  const w = mount(ProgressBar, { props: { progress: 70 } })
  expect(w.find('.bar').classes(), '外框應該一直有 bar class').toContain('bar')
  expect(w.find('.bar').classes(), '還沒到 100 不該有 done').not.toContain('done')
})

test('達到 100 時加上 done class', () => {
  const w = mount(ProgressBar, { props: { progress: 100 } })
  const bar = w.find('.bar')
  expect(bar.classes(), 'class="bar" 要保留').toContain('bar')
  expect(bar.classes(), 'progress 到 100 時應該加上 done').toContain('done')
  expect((w.find('.bar-fill').element as HTMLElement).style.width).toBe('100%')
})
