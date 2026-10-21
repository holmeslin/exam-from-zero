const Direction = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
} as const

// TODO：用數字查回名字，查不到就回傳 undefined
function directionName(value: number): string | undefined {
  return ''
}

console.log(Direction.Left)
console.log(directionName(Direction.Left))
console.log(directionName(9))
