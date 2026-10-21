import { expect, test } from 'vitest'
import { mergeSettings } from './settings.js'

test('overrides 蓋掉 defaults 的同名屬性', () => {
  const result = mergeSettings({ theme: 'light', fontSize: 14 }, { theme: 'dark' })
  expect(result, 'theme 應被 overrides 蓋成 dark，fontSize 保留').toEqual({ theme: 'dark', fontSize: 14 })
})

test('overrides 的新屬性會被加進來', () => {
  expect(mergeSettings({ theme: 'light' }, { lang: 'zh-TW' })).toEqual({ theme: 'light', lang: 'zh-TW' })
})

test('回傳新物件，不改動傳入的物件', () => {
  const defaults = { theme: 'light' }
  const overrides = { theme: 'dark' }
  const result = mergeSettings(defaults, overrides)
  expect(result, '應回傳新物件，不是 defaults 本身').not.toBe(defaults)
  expect(defaults, 'defaults 不該被改動').toEqual({ theme: 'light' })
  expect(overrides, 'overrides 不該被改動').toEqual({ theme: 'dark' })
})
