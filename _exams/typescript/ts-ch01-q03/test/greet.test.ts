import { expect, test } from 'vitest'
import { greet } from './greet.ts'

test('greet 重複 times 次', () => {
  expect(greet('小華', 2), 'greet("小華", 2)').toBe('你好，小華！你好，小華！')
  expect(greet('小明', 3), 'greet("小明", 3)').toBe('你好，小明！你好，小明！你好，小明！')
  expect(greet('小明', 0), 'times 是 0 時要回傳空字串').toBe('')
})
