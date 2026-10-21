import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import HighlightText from './HighlightText.vue'

test('背景色跟著值，.bold 修飾符決定粗體', async () => {
  const w = mount(HighlightText, { props: { color: 'yellow' } })
  const [plain, bold] = w.findAll('p').map((p) => p.element as HTMLElement)
  expect(plain.style.backgroundColor, '第一段的背景色應該是 yellow').toBe('yellow')
  expect(bold.style.backgroundColor, '第二段的背景色應該是 yellow').toBe('yellow')
  expect(plain.style.fontWeight, '沒有 .bold 的那段，fontWeight 應該是 normal').toBe('normal')
  expect(bold.style.fontWeight, '有 .bold 的那段，fontWeight 應該是 bold').toBe('bold')

  await w.setProps({ color: 'pink' })
  expect(plain.style.backgroundColor, 'color 改成 pink 之後，背景色要跟著變').toBe('pink')
  expect(bold.style.backgroundColor, 'color 改成 pink 之後，背景色要跟著變').toBe('pink')
})
