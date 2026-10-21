import { expect, test } from 'vitest'
import { findBook } from './findBook'

test('字串 id 找得到書', () => {
  expect(findBook('2')?.title, 'findBook("2") 應該找到河馬那本').toBe('河馬的資料結構')
})

test('不存在的 id 回傳 undefined', () => {
  expect(findBook('999'), 'findBook("999") 應該是 undefined').toBeUndefined()
})

test('陣列不是字串，回傳 undefined', () => {
  expect(findBook(['1']), 'findBook(["1"]) 應該是 undefined，不能把陣列轉成字串去找').toBeUndefined()
})

test('undefined 回傳 undefined', () => {
  expect(findBook(undefined), 'findBook(undefined) 應該是 undefined').toBeUndefined()
})
