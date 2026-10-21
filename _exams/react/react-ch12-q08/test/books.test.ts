import { expect, test } from 'vitest'
import { books, generateStaticParams, getBook } from './books'

test('generateStaticParams 回傳每本書一組 params，值是字串', () => {
  expect(generateStaticParams(), 'generateStaticParams()').toEqual([{ id: '1' }, { id: '2' }, { id: '3' }])
})

test('getBook 用網址上的字串書號找得到書', () => {
  expect(getBook('2'), "getBook('2')").toBe(books[1])
  expect(getBook('3')?.title, "getBook('3')?.title").toBe('企鵝的網路世界')
})

test('找不到的書號回傳 undefined', () => {
  expect(getBook('999'), "getBook('999')").toBeUndefined()
  expect(getBook('01'), "getBook('01')：網址的 '01' 不是書號 '1'").toBeUndefined()
})
