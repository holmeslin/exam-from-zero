import { expect, test } from 'vitest'
import { flexWidths } from './flex'

test('三個 flex: 1、沒有 gap，平均分', () => {
  expect(flexWidths(600, 0, [1, 1, 1]), '600 平均分成三份').toEqual([200, 200, 200])
})

test('flex: 2 的項目佔兩份', () => {
  expect(flexWidths(600, 0, [1, 2, 1]), '總共 4 份，每份 150').toEqual([150, 300, 150])
})

test('有 gap 時，先扣掉間距再分', () => {
  expect(flexWidths(620, 10, [1, 1, 1]), '三個項目之間有兩個 gap：620 - 10×2 = 600，再平均分').toEqual([200, 200, 200])
  expect(flexWidths(330, 30, [1, 2]), '330 - 30 = 300，分成 1 份和 2 份').toEqual([100, 200])
})
