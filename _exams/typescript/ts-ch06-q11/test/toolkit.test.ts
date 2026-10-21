import { expect, test } from 'vitest'
import { groupBy, uniqueBy } from './toolkit.ts'

const books = [
  { title: 'TypeScript 入門', category: '程式' },
  { title: '小王子', category: '文學' },
  { title: 'JavaScript 大全', category: '程式' },
]

test('groupBy 依分類收集元素', () => {
  const g = groupBy(books, (b) => b.category)
  expect(g, 'groupBy 應回傳 Map').toBeInstanceOf(Map)
  expect([...g.keys()], '鍵要依第一次出現的順序').toEqual(['程式', '文學'])
  expect(g.get('程式'), '「程式」分類應有兩本，順序不變').toEqual([books[0], books[2]])
  expect(g.get('文學'), '「文學」分類應只有小王子').toEqual([books[1]])
  expect(groupBy([], (x: string) => x).size, '空陣列應回傳空的 Map').toBe(0)
})

test('uniqueBy 只保留每個鍵第一次出現的元素', () => {
  expect(uniqueBy(books, (b) => b.category), '依分類去重應剩第一本程式書和小王子').toEqual([books[0], books[1]])
  expect(uniqueBy(['a', 'B', 'b', 'A', 'c'], (s) => s.toLowerCase()), '忽略大小寫去重').toEqual(['a', 'B', 'c'])
  expect(uniqueBy([], (x: string) => x), '空陣列應回傳 []').toEqual([])
})
