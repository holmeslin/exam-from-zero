import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Heading from './Heading'

test.each([1, 2, 3, 6])('level %i 渲染成對應的標題標籤', (level) => {
  const w = mount(Heading, { props: { level }, slots: { default: '小書店' } })
  expect(w.html(), `level 是 ${level} 時應該渲染成 <h${level} class="heading">`).toBe(
    `<h${level} class="heading">小書店</h${level}>`,
  )
})
