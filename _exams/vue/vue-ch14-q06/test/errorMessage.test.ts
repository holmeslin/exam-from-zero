import { expect, test } from 'vitest'
import { getErrorMessage } from './errorMessage'

test('取出伺服器 createError 寫的 message', () => {
  const err = Object.assign(new Error('[POST] "/api/messages": 400'), {
    data: { statusCode: 400, message: '名字和留言都要填' },
  })
  expect(getErrorMessage(err), '要回傳 err.data.message').toBe('名字和留言都要填')
})

test('另一個訊息也要原樣取出', () => {
  expect(getErrorMessage({ data: { message: '找不到這則留言' } })).toBe('找不到這則留言')
})

test('沒有 data（例如網路斷了）時回傳通用訊息', () => {
  expect(getErrorMessage(new Error('fetch failed'))).toBe('發生錯誤，請稍後再試')
})

test('data 裡沒有 message 時回傳通用訊息', () => {
  expect(getErrorMessage({ data: {} })).toBe('發生錯誤，請稍後再試')
})
