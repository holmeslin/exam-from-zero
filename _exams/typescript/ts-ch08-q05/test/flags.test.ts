import { expect, test } from 'vitest'
import { diffFlags } from './flags.ts'

test('設定的每個屬性都有旗標', () => {
  const defaults = { darkMode: false, fontSize: 16, language: 'zh-TW' }
  const current = { darkMode: true, fontSize: 16, language: 'en' }
  expect(diffFlags(current, defaults)).toEqual({ darkMode: true, fontSize: false, language: true })
})

test('完全相同時全部是 false', () => {
  const point = { x: 1, y: 2 }
  expect(diffFlags(point, { x: 1, y: 2 }), '值都一樣，旗標應該全部是 false').toEqual({ x: false, y: false })
})

test('適用任何物件型別', () => {
  expect(diffFlags({ a: 'x', b: 'y', c: 'z' }, { a: 'x', b: 'Y', c: 'z' })).toEqual({ a: false, b: true, c: false })
})
