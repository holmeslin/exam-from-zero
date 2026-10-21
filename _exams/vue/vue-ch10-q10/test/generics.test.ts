import { expect, test } from 'vitest'
import { fail, first, last, ok } from './generics'

test('first 和 last 對各種陣列都能用', () => {
  expect(first(['小明', '小華']), 'first(["小明", "小華"]) 應是 "小明"').toBe('小明')
  expect(last(['小明', '小華']), 'last(["小明", "小華"]) 應是 "小華"').toBe('小華')
  expect(last([90, 80, 70]), 'last([90, 80, 70]) 應是 70').toBe(70)
  const item = { id: 1 }
  expect(last([item]), 'last 應回傳原本那個物件').toBe(item)
})

test('空陣列回傳 undefined', () => {
  expect(first([]), 'first([]) 應是 undefined').toBeUndefined()
  expect(last([]), 'last([]) 應是 undefined').toBeUndefined()
})

test('ok 包成成功的 ApiResult', () => {
  expect(ok(['鍵盤', '滑鼠']), 'ok(資料) 應回傳 { data: 資料, error: null }').toEqual({ data: ['鍵盤', '滑鼠'], error: null })
  expect(ok(0), 'ok(0) 的 data 應是 0，不是 null').toEqual({ data: 0, error: null })
})

test('fail 包成失敗的 ApiResult', () => {
  expect(fail('連線失敗'), 'fail(訊息) 應回傳 { data: null, error: 訊息 }').toEqual({ data: null, error: '連線失敗' })
})
