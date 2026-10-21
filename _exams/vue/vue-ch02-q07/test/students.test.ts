import { expect, test } from 'vitest'
import { updateEnglish } from './students.js'

const make = () => [
  { id: 1, name: '小明', scores: { math: 90, english: 70 } },
  { id: 2, name: '小華', scores: { math: 55, english: 80 } },
  { id: 3, name: '小美', scores: { math: 100 } },
]

test('新陣列裡小華的英文變成 90，其他欄位保留', () => {
  const updated = updateEnglish(make(), 2, 90)
  expect(updated[1], '小華的資料不正確').toEqual({ id: 2, name: '小華', scores: { math: 55, english: 90 } })
  expect(updated.length, '學生人數不該改變').toBe(3)
})

test('原本的資料完全沒被改到', () => {
  const students = make()
  const before = JSON.stringify(students)
  const updated = updateEnglish(students, 2, 90)
  expect(JSON.stringify(students), '原本的 students 被改到了（記得兩層都要複製）').toBe(before)
  expect(updated, '應回傳新的陣列，而不是原本那一個').not.toBe(students)
})

test('被修改的學生是新物件，沒修改的沿用原本的物件', () => {
  const students = make()
  const updated = updateEnglish(students, 2, 90)
  expect(updated[1], '小華應該是新物件').not.toBe(students[1])
  expect(updated[1].scores, '小華的 scores 也應該是新物件').not.toBe(students[1].scores)
  expect(updated[0], '小明沒被修改，應該是同一個物件').toBe(students[0])
  expect(updated[2], '小美沒被修改，應該是同一個物件').toBe(students[2])
})
