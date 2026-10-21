import { expect, test } from 'vitest'
import { describe as describeBook } from './book'

test('describe 回傳「書名：價格 元」', () => {
  expect(describeBook({ title: '小王子', price: 250 }), '小王子 250 元應該得到「小王子：250 元」').toBe('小王子：250 元')
  expect(describeBook({ title: '夜鶯', price: 0 }), '價格 0 也要照樣印出').toBe('夜鶯：0 元')
})
