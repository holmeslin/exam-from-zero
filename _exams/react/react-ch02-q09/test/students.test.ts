import { expect, test } from 'vitest'
import { updateEnglish } from './students.js'

const make = () => [
  { id: 1, name: '小明', scores: { math: 90, english: 70 } },
  { id: 2, name: '小華', scores: { math: 55, english: 80 } },
]

test('新陣列裡小華的英文變成 90，數學保留', () => {
  const result = updateEnglish(make(), 2, 90)
  expect(result[1].scores, '小華應為 { math: 55, english: 90 }').toEqual({ math: 55, english: 90 })
})

test('原本的 students 完全沒被改到（兩層都要複製）', () => {
  const students = make()
  const result = updateEnglish(students, 2, 90)
  expect(students[1].scores.english, '原本小華的英文應仍是 80；scores 也要展開複製').toBe(80)
  expect(result[1].scores, '新的 scores 應是新物件').not.toBe(students[1].scores)
})

test('其他學生原樣沿用同一個物件', () => {
  const students = make()
  const result = updateEnglish(students, 2, 90)
  expect(result[0], '小明沒改，應是同一個物件').toBe(students[0])
})
