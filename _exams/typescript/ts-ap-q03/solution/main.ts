const Direction = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
} as const

function directionName(value: number): string | undefined {
  return Object.keys(Direction).find(
    (key) => Direction[key as keyof typeof Direction] === value,
  )
}

console.log(Direction.Left)
console.log(directionName(Direction.Left))
console.log(directionName(9))
