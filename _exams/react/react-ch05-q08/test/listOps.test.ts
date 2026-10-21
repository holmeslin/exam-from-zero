import { expect, test } from 'vitest'
import { addItem, removeItem, sortByName, toggleItem } from './listOps.ts'

function sample() {
  return [
    { id: 1, name: 'b 牛奶', bought: false },
    { id: 2, name: 'a 麵包', bought: false },
  ]
}

test('addItem 回傳新陣列，不修改原陣列', () => {
  const items = sample()
  const egg = { id: 3, name: 'c 雞蛋', bought: false }
  const result = addItem(items, egg)
  expect(result.map((i) => i.id), '新陣列最後應多出新項目').toEqual([1, 2, 3])
  expect(result, 'addItem 應回傳新陣列，而不是原本那一個').not.toBe(items)
  expect(items.length, '原陣列不應被修改（不要用 push）').toBe(2)
})

test('removeItem 回傳新陣列，不修改原陣列', () => {
  const items = sample()
  const result = removeItem(items, 1)
  expect(result.map((i) => i.id), '刪掉 id 1 之後只剩 id 2').toEqual([2])
  expect(items.length, '原陣列不應被修改（不要用 splice）').toBe(2)
})

test('toggleItem 回傳新陣列，被改的那項是新物件，其他項目原封不動', () => {
  const items = sample()
  const result = toggleItem(items, 2)
  expect(result[1].bought, 'id 2 的 bought 應變成 true').toBe(true)
  expect(items[1].bought, '原本的物件不應被修改').toBe(false)
  expect(result, 'toggleItem 應回傳新陣列').not.toBe(items)
  expect(result[1], '被改的那一項應該是新物件').not.toBe(items[1])
  expect(result[0], '沒被改的項目可以直接沿用原物件').toBe(items[0])
})

test('sortByName 回傳排好的新陣列，不修改原陣列', () => {
  const items = sample()
  const result = sortByName(items)
  expect(result.map((i) => i.id), '依名稱排序後順序應為 2, 1').toEqual([2, 1])
  expect(items.map((i) => i.id), '原陣列順序不應被改變（先複製再 sort）').toEqual([1, 2])
})
