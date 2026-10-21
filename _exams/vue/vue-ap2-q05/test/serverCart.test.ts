import { expect, test } from 'vitest'
import { handleRequest } from './serverCart'

test('同一個請求裡的元件共用同一個 store', () => {
  expect(handleRequest(['鍵盤', '滑鼠']), '同一個請求加的兩件都要在').toEqual(['鍵盤', '滑鼠'])
})

test('不同請求之間不會互相汙染', () => {
  handleRequest(['小明的鍵盤'])
  expect(handleRequest(['小華的滑鼠']), '小華的請求不該看到小明的鍵盤').toEqual(['小華的滑鼠'])
  expect(handleRequest([]), '什麼都沒加的請求應該是空的').toEqual([])
})
