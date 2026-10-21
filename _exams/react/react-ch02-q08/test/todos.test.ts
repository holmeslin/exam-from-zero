import { expect, test } from 'vitest'
import { addTodo, removeTodo, toggleTodo } from './todos.js'

const make = () => [
  { id: 1, text: '洗衣服', done: false },
  { id: 2, text: '寫程式', done: false },
]

test('addTodo 回傳新陣列，原陣列不變', () => {
  const todos = make()
  const result = addTodo(todos, { id: 3, text: '買晚餐', done: false })
  expect(result.map((t) => t.id)).toEqual([1, 2, 3])
  expect(result, '應回傳新陣列，不是原本那個').not.toBe(todos)
  expect(todos, '原本的 todos 不該被改動').toEqual(make())
})

test('removeTodo 回傳新陣列，原陣列不變', () => {
  const todos = make()
  const result = removeTodo(todos, 1)
  expect(result.map((t) => t.id)).toEqual([2])
  expect(result, '應回傳新陣列，不是原本那個').not.toBe(todos)
  expect(todos, '原本的 todos 不該被改動').toEqual(make())
})

test('toggleTodo 只換掉被切換的那一項', () => {
  const todos = make()
  const result = toggleTodo(todos, 2)
  expect(result[1].done, 'id 2 的 done 應變成 true').toBe(true)
  expect(result, '應回傳新陣列').not.toBe(todos)
  expect(result[1], '被切換的那一項應是新物件').not.toBe(todos[1])
  expect(result[0], '沒被切換的那一項應原樣沿用（同一個物件）').toBe(todos[0])
  expect(todos, '原本的 todos 和裡面的物件都不該被改動').toEqual(make())
})
