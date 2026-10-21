import { expect, test } from 'vitest'
import { matchRoute } from './matchRoute'

test('動態那一段的值放進 params，而且是字串', () => {
  expect(matchRoute('/books/[id]', '/books/2'), "matchRoute('/books/[id]', '/books/2')").toEqual({ id: '2' })
  expect(matchRoute('/books/[id]', '/books/boom'), "matchRoute('/books/[id]', '/books/boom')").toEqual({ id: 'boom' })
})

test('可以有好幾個動態段', () => {
  expect(
    matchRoute('/shops/[shop]/books/[id]', '/shops/taipei/books/7'),
    "matchRoute('/shops/[shop]/books/[id]', '/shops/taipei/books/7')",
  ).toEqual({ shop: 'taipei', id: '7' })
})

test('固定的網址完全相同才算對得上，回傳空物件', () => {
  expect(matchRoute('/about', '/about'), "matchRoute('/about', '/about')").toEqual({})
  expect(matchRoute('/about', '/books'), "matchRoute('/about', '/books')").toBeNull()
})

test('段數不同或固定段不同就對不上', () => {
  expect(matchRoute('/books/[id]', '/books'), "matchRoute('/books/[id]', '/books')").toBeNull()
  expect(matchRoute('/books/[id]', '/books/1/edit'), "matchRoute('/books/[id]', '/books/1/edit')").toBeNull()
  expect(matchRoute('/books/[id]', '/shops/1'), "matchRoute('/books/[id]', '/shops/1')").toBeNull()
})
