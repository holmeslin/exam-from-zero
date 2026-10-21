import { expect, test } from 'vitest'
import { BookRecord, toCardProps } from './toCardProps.ts'

const book = new BookRecord('1', '貓咪程式設計', 12, '作者要求下個月改版')

test('回傳純物件，不是類別的實體', () => {
  const props = toCardProps(book)
  expect(props instanceof BookRecord, '不能直接回傳 BookRecord 的實體').toBe(false)
  expect(Object.getPrototypeOf(props), '要用 {} 建立的純物件').toBe(Object.prototype)
})

test('只放 id、title、likes 三個欄位', () => {
  expect(toCardProps(book), 'internalNote 不該讓使用者在原始碼裡看到').toEqual({
    id: '1',
    title: '貓咪程式設計',
    likes: 12,
  })
})
