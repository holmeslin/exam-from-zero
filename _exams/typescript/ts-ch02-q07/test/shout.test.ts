import { expect, test } from 'vitest'
import { shout } from './shout.ts'

test('有名字時轉大寫', () => {
  expect(shout('ada'), "shout('ada') 應該是 'ADA'").toBe('ADA')
})

test('null 時回傳「無名氏」', () => {
  expect(() => shout(null), 'shout(null) 不應該當掉').not.toThrow()
  expect(shout(null), "shout(null) 應該是 '無名氏'").toBe('無名氏')
})
