import { expect, test } from 'vitest'
import { parseAge } from './result.ts'

test('合法的年齡', () => {
  expect(parseAge('20'), 'parseAge("20") 應回傳 { ok: true, value: 20 }').toEqual({ ok: true, value: 20 })
  expect(parseAge('0'), 'parseAge("0") 應回傳 { ok: true, value: 0 }').toEqual({ ok: true, value: 0 })
})

test('不是數字', () => {
  expect(parseAge('二十'), 'parseAge("二十") 應回傳失敗結果').toEqual({ ok: false, error: '「二十」不是數字' })
})

test('負數', () => {
  expect(parseAge('-3'), 'parseAge("-3") 應回傳失敗結果').toEqual({ ok: false, error: '年齡不能是負數' })
})
