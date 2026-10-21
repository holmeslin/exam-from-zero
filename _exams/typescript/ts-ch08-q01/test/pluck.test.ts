import { expect, test } from 'vitest'
import { pluck } from './pluck.ts'

const products = [
  { name: '原子筆', price: 15 },
  { name: '筆記本', price: 45 },
]

test('pluck 取出 name', () => {
  expect(pluck(products, 'name'), 'pluck(products, "name") 應該回傳所有名稱').toEqual(['原子筆', '筆記本'])
})

test('pluck 取出 price', () => {
  expect(pluck(products, 'price'), 'pluck(products, "price") 應該回傳所有價格').toEqual([15, 45])
})

test('空陣列回傳空陣列', () => {
  expect(pluck([] as { id: number }[], 'id')).toEqual([])
})
