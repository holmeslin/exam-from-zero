import { expect, test } from 'vitest'
import { reducer, type Todo } from './reducer.ts'

const start = (): Todo[] =>
  Object.freeze([
    Object.freeze({ id: 1, text: '買牛奶', done: false }),
    Object.freeze({ id: 2, text: '寫作業', done: true }),
  ]) as Todo[]

test('add 在最後加一筆未完成的事項', () => {
  expect(reducer(start(), { type: 'add', id: 3, text: '運動' })[2]).toEqual({ id: 3, text: '運動', done: false })
})

test('toggle 切換指定 id 的 done', () => {
  const next = reducer(start(), { type: 'toggle', id: 1 })
  expect(next.map((t) => t.done), 'toggle id 1 之後，done 應該是 [true, true]').toEqual([true, true])
  const back = reducer(start(), { type: 'toggle', id: 2 })
  expect(back.map((t) => t.done), 'toggle id 2 之後，done 應該是 [false, false]').toEqual([false, false])
})

test('remove 刪掉指定 id', () => {
  const next = reducer(start(), { type: 'remove', id: 1 })
  expect(next.map((t) => t.id), 'remove id 1 之後只剩 id 2').toEqual([2])
})

test('不直接修改原本的陣列與物件', () => {
  // start() 的資料被凍結，直接修改會丟出錯誤
  expect(() => reducer(start(), { type: 'toggle', id: 1 }), '要回傳新的陣列和新的物件，不要改原本的').not.toThrow()
  const before = start()
  const after = reducer(before, { type: 'toggle', id: 1 })
  expect(after, 'toggle 要回傳新的陣列').not.toBe(before)
})
