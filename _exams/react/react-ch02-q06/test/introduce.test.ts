import { expect, test } from 'vitest'
import { introduce } from './introduce.js'

test('屬性齊全時照實組出句子', () => {
  expect(introduce({ name: '小明', age: 20, city: '台北' })).toBe('小明，20 歲，住在台北')
})

test('缺 age 用 18、缺 city 用「未知」', () => {
  expect(introduce({ name: '小華' }), '缺少的屬性要用預設值').toBe('小華，18 歲，住在未知')
})

test('age 是 0 時保留 0（預設值只在 undefined 時生效）', () => {
  expect(introduce({ name: '小寶', age: 0, city: '高雄' }), 'age 為 0 不該被換成 18').toBe('小寶，0 歲，住在高雄')
})
