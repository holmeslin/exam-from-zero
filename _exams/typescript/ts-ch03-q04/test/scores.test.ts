import { expect, test } from 'vitest'
import { addScore } from './scores'

test('addScore 回傳加上新分數的陣列', () => {
  expect(addScore([90, 85], 77)).toEqual([90, 85, 77])
  expect(addScore([], 100)).toEqual([100])
})

test('addScore 不可以改到原本的陣列', () => {
  const scores = [90, 85, 77]
  const result = addScore(scores, 100)
  expect(scores, '原本的 scores 被改掉了：readonly 陣列不能 push').toEqual([90, 85, 77])
  expect(result, '要回傳一個新陣列，不是原本那一個').not.toBe(scores)
})
