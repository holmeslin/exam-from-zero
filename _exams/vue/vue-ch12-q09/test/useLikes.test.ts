import { isRef } from 'vue'
import { expect, test } from 'vitest'
import { useLikes } from './useLikes'

test('likes 是 ref，從 0 開始', () => {
  const { likes } = useLikes()
  expect(isRef(likes), 'likes 應該是 ref').toBe(true)
  expect(likes.value).toBe(0)
})

test('每呼叫一次 like，likes 加 1', () => {
  const { likes, like } = useLikes()
  like()
  like()
  expect(likes.value, '呼叫兩次 like 之後應該是 2').toBe(2)
})

test('每次呼叫 useLikes 都是獨立的數字', () => {
  const a = useLikes()
  const b = useLikes()
  a.like()
  expect(b.likes.value, '按 a 的讚不應該影響 b').toBe(0)
})
