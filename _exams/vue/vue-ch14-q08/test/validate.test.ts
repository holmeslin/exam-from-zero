import { expect, test } from 'vitest'
import { validateMessage } from './validate'

function errorOf(fn: () => unknown) {
  try {
    fn()
  } catch (err) {
    return err as { status?: number; message?: string }
  }
  throw new Error('預期要 throw createError(...)，但函式沒有丟出錯誤')
}

test('名字是數字 → 400「請輸入名字」', () => {
  const err = errorOf(() => validateMessage(123, '嗨'))
  expect(err.status, '狀態碼要是 400').toBe(400)
  expect(err.message).toBe('請輸入名字')
})

test('名字只有空白 → 400「請輸入名字」', () => {
  const err = errorOf(() => validateMessage('   ', '嗨'))
  expect(err.status).toBe(400)
  expect(err.message).toBe('請輸入名字')
})

test('什麼都沒帶（undefined）→ 400「請輸入名字」', () => {
  const err = errorOf(() => validateMessage(undefined, undefined))
  expect(err.status).toBe(400)
  expect(err.message).toBe('請輸入名字')
})

test('名字 21 個字 → 400「名字最多 20 個字」', () => {
  const err = errorOf(() => validateMessage('名'.repeat(21), '嗨'))
  expect(err.status).toBe(400)
  expect(err.message).toBe('名字最多 20 個字')
})

test('留言只有空白 → 400「請輸入留言內容」', () => {
  const err = errorOf(() => validateMessage('小明', '  '))
  expect(err.status).toBe(400)
  expect(err.message).toBe('請輸入留言內容')
})

test('留言是陣列 → 400「請輸入留言內容」', () => {
  const err = errorOf(() => validateMessage('小明', ['嗨']))
  expect(err.message).toBe('請輸入留言內容')
})

test('留言 201 個字 → 400「留言最多 200 個字」', () => {
  const err = errorOf(() => validateMessage('小明', 'a'.repeat(201)))
  expect(err.status).toBe(400)
  expect(err.message).toBe('留言最多 200 個字')
})

test('剛好在上限內可以通過', () => {
  expect(validateMessage('名'.repeat(20), 'a'.repeat(200))).toEqual({
    name: '名'.repeat(20),
    text: 'a'.repeat(200),
  })
})

test('通過時回傳去掉頭尾空白的 name 和 text', () => {
  expect(validateMessage('  小明  ', '  哈囉  '), '要用 trim() 去掉頭尾空白').toEqual({
    name: '小明',
    text: '哈囉',
  })
})
