import { expect, test } from 'vitest'
import { validateMessage } from './validate.ts'

test('缺少名字欄位（null）不能變成字串 "null"', () => {
  expect(validateMessage(null, '你好'), 'rawName 不是字串時要當成空字串').toEqual({
    ok: false,
    error: '請輸入名字',
    name: '',
    text: '你好',
  })
})

test('收到檔案等非字串的值也當成空字串', () => {
  expect(validateMessage('小明', 42), 'rawText 不是字串時要當成空字串').toEqual({
    ok: false,
    error: '請輸入留言內容',
    name: '小明',
    text: '',
  })
})

test('名字最多 20 個字', () => {
  const name = '名'.repeat(21)
  expect(validateMessage(name, '你好'), '21 個字的名字要被拒絕').toEqual({
    ok: false,
    error: '名字最多 20 個字',
    name,
    text: '你好',
  })
  expect(validateMessage('名'.repeat(20), '你好').ok, '剛好 20 個字要通過').toBe(true)
})

test('留言最多 200 個字', () => {
  const text = '啊'.repeat(201)
  expect(validateMessage('小明', text), '201 個字的留言要被拒絕').toEqual({
    ok: false,
    error: '留言最多 200 個字',
    name: '小明',
    text,
  })
  expect(validateMessage('小明', '啊'.repeat(200)).ok, '剛好 200 個字要通過').toBe(true)
})

test('通過時回傳去掉空白的乾淨資料', () => {
  expect(validateMessage('  小明 ', ' 好書！ ')).toEqual({ ok: true, name: '小明', text: '好書！' })
})
