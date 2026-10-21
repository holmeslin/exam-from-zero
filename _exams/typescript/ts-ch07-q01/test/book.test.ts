import { expect, test } from 'vitest'
import { Book } from './book.ts'

test('建構子要把書名和價格存進屬性', () => {
  const b = new Book('TypeScript 入門', 450)
  expect(b.title, 'title 應該是建構子收到的書名').toBe('TypeScript 入門')
  expect(b.price, 'price 應該是建構子收到的價格').toBe(450)
})

test('stock 的初始值是 0', () => {
  expect(new Book('A', 1).stock).toBe(0)
})

test('每次 new 都是獨立的物件', () => {
  const a = new Book('A', 100)
  const b = new Book('B', 200)
  expect(a.title).toBe('A')
  expect(b.title).toBe('B')
  expect(a.price + b.price).toBe(300)
})
