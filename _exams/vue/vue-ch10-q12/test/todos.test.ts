import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, expect, test } from 'vitest'
import { useTodoStore } from './todos'

beforeEach(() => {
  setActivePinia(createPinia())
})

test('addTodo 加入未完成的待辦', () => {
  const store = useTodoStore()
  store.addTodo('買牛奶')
  store.addTodo('寫作業')
  expect(store.todos.map((t) => t.text), 'addTodo 兩次後，todos 的 text 應依序是買牛奶、寫作業').toEqual(['買牛奶', '寫作業'])
  expect(store.todos.every((t) => t.done === false), '新加入的待辦 done 應是 false').toBe(true)
  expect(new Set(store.todos.map((t) => t.id)).size, '每筆待辦的 id 不能重複').toBe(2)
  expect(store.remaining, '兩筆都沒完成時 remaining 應是 2').toBe(2)
})

test('toggleTodo 切換完成狀態，remaining 跟著變', () => {
  const store = useTodoStore()
  store.addTodo('買牛奶')
  store.addTodo('寫作業')
  const id = store.todos[0]!.id
  store.toggleTodo(id)
  expect(store.todos[0]!.done, 'toggleTodo 後第一筆的 done 應變成 true').toBe(true)
  expect(store.remaining, '完成一筆後 remaining 應是 1').toBe(1)
  store.toggleTodo(id)
  expect(store.todos[0]!.done, '再 toggle 一次應變回 false').toBe(false)
  expect(store.remaining, '變回未完成後 remaining 應是 2').toBe(2)
})

test('找不到 id 時什麼都不做', () => {
  const store = useTodoStore()
  store.addTodo('買牛奶')
  const ids = store.todos.map((t) => t.id)
  const missing = Math.max(...ids) + 999
  expect(() => store.toggleTodo(missing), '找不到的 id 不應丟出錯誤').not.toThrow()
  expect(store.remaining, '找不到的 id 不應改變任何待辦').toBe(1)
})
