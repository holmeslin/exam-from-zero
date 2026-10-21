import { expect, test } from 'vitest'
import { tasksReducer } from './tasksReducer.ts'

// 把陣列和每個物件都凍結：只要 reducer 直接修改它們就會丟出錯誤
function frozenTasks() {
  return Object.freeze([
    Object.freeze({ id: 1, text: '買牛奶', done: true }),
    Object.freeze({ id: 2, text: '寫程式', done: false }),
  ]) as any
}

function run(tasks: any, action: any) {
  try {
    return tasksReducer(tasks, action)
  } catch (e) {
    throw new Error(`「${action.type}」時直接修改了 state（${(e as Error).message}），請回傳新的陣列或物件`)
  }
}

test('added：回傳加上新項目的新陣列', () => {
  const tasks = frozenTasks()
  const next = run(tasks, { type: 'added', id: 3, text: '運動' })
  expect(next, 'added 要回傳新的陣列，不能是原本那個').not.toBe(tasks)
  expect(next).toEqual([
    { id: 1, text: '買牛奶', done: true },
    { id: 2, text: '寫程式', done: false },
    { id: 3, text: '運動', done: false },
  ])
})

test('toggled：只換掉被勾選的那一項', () => {
  const tasks = frozenTasks()
  const next = run(tasks, { type: 'toggled', id: 2 })
  expect(next, 'toggled 要回傳新的陣列').not.toBe(tasks)
  expect(next[1]).toEqual({ id: 2, text: '寫程式', done: true })
  expect(next[0], '沒被勾選的項目應該維持原本的物件').toBe(tasks[0])
})

test('deleted：回傳少了那一項的新陣列', () => {
  const tasks = frozenTasks()
  const next = run(tasks, { type: 'deleted', id: 1 })
  expect(next, 'deleted 要回傳新的陣列').not.toBe(tasks)
  expect(next).toEqual([{ id: 2, text: '寫程式', done: false }])
})

test('未知的 action 要丟出錯誤', () => {
  expect(() => tasksReducer(frozenTasks(), { type: 'renamed' })).toThrow('未知的 action')
})
