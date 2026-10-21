import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import ColorDemo from './ColorDemo.vue'
import { registerDirectives } from './directives'


test('全域註冊後，任何元件都能直接寫 v-color', () => {
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  const w = mount(ColorDemo, { global: { plugins: [{ install: registerDirectives }] } })
  const resolveFailed = warn.mock.calls.some((c) => String(c[0]).includes('Failed to resolve directive'))
  expect(resolveFailed, 'Vue 找不到 v-color 指令；app.directive 的名字要不要含 v-？').toBe(false)
  const a = w.find('.a').element as HTMLElement
  const b = w.find('.b').element as HTMLElement
  expect(a.style.color, 'v-color="\'red\'" 應該把文字顏色設成 red').toBe('red')
  expect(b.style.backgroundColor, 'v-color:background="\'yellow\'" 應該把背景色設成 yellow').toBe('yellow')
  expect(b.style.color, '有 :background 參數時不應該改文字顏色').toBe('')
})
