import { expect, test } from 'vitest'
import { boxWidth } from './box'

test('content-box、一個值的 padding', () => {
  expect(boxWidth({ width: 200, padding: '20px', border: 2, boxSizing: 'content-box' }), '200 + 20×2 + 2×2 應該是 244').toBe(244)
})

test('content-box、兩個值的 padding（上下 左右）', () => {
  expect(boxWidth({ width: 200, padding: '10px 30px', border: 1, boxSizing: 'content-box' }), '左右各 30：200 + 30×2 + 1×2 應該是 262').toBe(262)
})

test('content-box、四個值的 padding（上 右 下 左）', () => {
  expect(boxWidth({ width: 100, padding: '1px 2px 3px 4px', border: 5, boxSizing: 'content-box' }), '右 2、左 4：100 + 2 + 4 + 5×2 應該是 116').toBe(116)
})

test('border-box 的 width 就是整個盒子的寬度', () => {
  expect(boxWidth({ width: 200, padding: '10px 30px', border: 2, boxSizing: 'border-box' }), 'border-box 時應該就是 200').toBe(200)
})
