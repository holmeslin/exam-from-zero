import { expect, test } from 'vitest'
import { handleRequest } from './leakyCart'

test('每個請求都拿到自己的一份購物車', () => {
  expect(handleRequest('小明的鍵盤'), '小明的請求').toEqual(['小明的鍵盤'])
  expect(handleRequest('小華的滑鼠'), '小華的畫面不該出現小明的鍵盤').toEqual(['小華的滑鼠'])
  expect(handleRequest(), '第三個人什麼都沒加，應該是空的').toEqual([])
})
