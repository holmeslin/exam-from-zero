import { beforeEach, expect, test } from 'vitest'
import { createTodoApp } from './todo'

let app: ReturnType<typeof createTodoApp>

beforeEach(() => {
  document.body.innerHTML = `
    <p id="empty">目前沒有待辦事項</p>
    <ul id="list"></ul>
    <p id="summary">共 0 項</p>
  `
  app = createTodoApp(document.body)
})

const items = () => [...document.querySelectorAll('#list li')].map((li) => li.textContent)
const summary = () => document.querySelector('#summary')!.textContent
const emptyHidden = () => (document.querySelector('#empty') as HTMLElement).hidden

test('新增後，清單、統計、提示都跟著變', () => {
  app.addTodo('買牛奶')
  app.addTodo('寫作業')
  expect(items(), '#list 裡應該有兩個 <li>：買牛奶、寫作業').toEqual(['買牛奶', '寫作業'])
  expect(summary(), '統計文字應該是「共 2 項」').toBe('共 2 項')
  expect(emptyHidden(), '有待辦事項時，「目前沒有待辦事項」要隱藏（hidden = true）').toBe(true)
})

test('刪除後，畫面和資料一致', () => {
  app.addTodo('買牛奶')
  app.addTodo('寫作業')
  app.addTodo('倒垃圾')
  app.removeTodo(1)
  expect(items(), '刪掉第 1 項（寫作業）後，清單應該剩買牛奶、倒垃圾').toEqual(['買牛奶', '倒垃圾'])
  expect(summary(), '統計文字應該是「共 2 項」').toBe('共 2 項')
})

test('全部刪光後，提示重新出現', () => {
  app.addTodo('買牛奶')
  app.removeTodo(0)
  expect(items(), '清單應該是空的').toEqual([])
  expect(summary(), '統計文字應該是「共 0 項」').toBe('共 0 項')
  expect(emptyHidden(), '沒有待辦事項時，「目前沒有待辦事項」要顯示（hidden = false）').toBe(false)
})
