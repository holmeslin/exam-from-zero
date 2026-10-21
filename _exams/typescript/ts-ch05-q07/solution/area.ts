export type Circle = { kind: 'circle'; radius: number }
export type Rectangle = { kind: 'rectangle'; width: number; height: number }
export type Triangle = { kind: 'triangle'; base: number; height: number }
export type Shape = Circle | Rectangle | Triangle

export function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2
    case 'rectangle':
      return shape.width * shape.height
    case 'triangle':
      return (shape.base * shape.height) / 2
  }
}
