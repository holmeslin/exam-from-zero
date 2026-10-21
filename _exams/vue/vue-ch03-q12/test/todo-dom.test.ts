import { beforeEach, expect, test, vi } from 'vitest'

let todo: { addTodo: (text: string) => void; removeTodo: (index: number) => void }

beforeEach(async () => {
  document.body.innerHTML = `
    <p id="empty">目前沒有待辦事項</p>
    <ul id="list"></ul>
    <p id="summary">共 0 項</p>
    <button id="add">新增</button>
    <button id="remove">刪除第一項</button>`
  vi.resetModules()
  todo = await import('./todo.js')
})

const items = () => [...document.querySelectorAll('#list li')].map((li) => li.textContent)
const summary = () => document.querySelector('#summary')!.textContent
const empty = () => (document.querySelector('#empty') as HTMLElement).hidden

test('新增之後，清單、統計、提示都更新', () => {
  todo.addTodo('買牛奶')
  todo.addTodo('寫作業')
  expect(items(), '清單應該有兩個 <li>').toEqual(['買牛奶', '寫作業'])
  expect(summary(), '統計文字應該是「共 2 項」').toBe('共 2 項')
  expect(empty(), '有待辦時，「目前沒有待辦事項」要藏起來').toBe(true)
})

test('刪除第一項，畫面上的 <li> 也要跟著刪掉', () => {
  todo.addTodo('買牛奶')
  todo.addTodo('寫作業')
  todo.removeTodo(0)
  expect(items(), 'removeTodo(0) 之後，畫面上只剩「寫作業」').toEqual(['寫作業'])
  expect(summary(), 'removeTodo(0) 之後，統計文字應該是「共 1 項」').toBe('共 1 項')
  expect(empty(), '還有一項時，提示仍然要藏著').toBe(true)
})

test('刪到一項不剩，提示要再出現', () => {
  todo.addTodo('買牛奶')
  todo.removeTodo(0)
  expect(items(), '清單應該是空的').toEqual([])
  expect(summary(), '統計文字應該是「共 0 項」').toBe('共 0 項')
  expect(empty(), '清單空了，「目前沒有待辦事項」要重新顯示（hidden = false）').toBe(false)
})

test('按鈕也能用；刪除不存在的項目什麼都不做', () => {
  ;(document.querySelector('#add') as HTMLButtonElement).click()
  ;(document.querySelector('#remove') as HTMLButtonElement).click()
  expect(items(), '按「新增」再按「刪除第一項」，清單應該是空的').toEqual([])
  expect(() => todo.removeTodo(0), '清單已經空了，removeTodo(0) 不該出錯').not.toThrow()
  expect(summary(), '刪除不存在的項目後，統計文字仍是「共 0 項」').toBe('共 0 項')
})
