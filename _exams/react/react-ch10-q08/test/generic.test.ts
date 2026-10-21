import { expect, test } from 'vitest'
import { first, toResult } from './generic.ts'

test('first 回傳第一個元素', () => {
  expect(first(['小明', '小華']), "first(['小明', '小華'])").toBe('小明')
  expect(first([90, 80]), 'first([90, 80])').toBe(90)
})

test('first 遇到空陣列回傳 undefined', () => {
  expect(first([]), 'first([])').toBeUndefined()
})

test('toResult 有值時放進 data', () => {
  expect(toResult(['小明'], '沒有資料'), "toResult(['小明'], '沒有資料')").toEqual({ data: ['小明'], error: null })
})

test('toResult 遇到 undefined 時放進 error', () => {
  expect(toResult(undefined, '沒有資料'), "toResult(undefined, '沒有資料')").toEqual({ data: null, error: '沒有資料' })
})

test('toResult 不能把 0、空字串當成沒有值', () => {
  expect(toResult(first([0, 1]), '沒有資料'), '0 也是一筆資料，要用 === undefined 判斷，不是用真假值').toEqual({ data: 0, error: null })
  expect(toResult('', '沒有資料'), "'' 也是一筆資料").toEqual({ data: '', error: null })
})
