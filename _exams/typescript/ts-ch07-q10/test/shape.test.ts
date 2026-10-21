import { expect, test } from 'vitest'
import { Circle, Rectangle, Shape } from './shape.ts'

test('Rectangle 的面積是寬乘高', () => {
  expect(new Rectangle(3, 4).area()).toBe(12)
  expect(new Rectangle(2.5, 2).area()).toBe(5)
})

test('describe 用子類別自己的 area，取到小數點後一位', () => {
  expect(new Circle(2).describe()).toBe('圓形的面積是 12.6')
  expect(new Rectangle(3, 4).describe()).toBe('長方形的面積是 12.0')
})

test('describe 寫在 Shape，新的子類別不用再寫一次', () => {
  class Square extends Shape {
    side: number
    constructor(side: number) {
      super('正方形')
      this.side = side
    }
    area(): number {
      return this.side * this.side
    }
  }
  expect(new Square(3).describe()).toBe('正方形的面積是 9.0')
})

test('Shape[] 可以放不同的子類別', () => {
  const shapes: Shape[] = [new Circle(1), new Rectangle(1, 2)]
  expect(shapes.map((s) => s.describe())).toEqual(['圓形的面積是 3.1', '長方形的面積是 2.0'])
})
