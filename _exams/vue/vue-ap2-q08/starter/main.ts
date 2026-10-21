import { readFileSync } from 'node:fs'

export function useFormatPrice(price: number): string {
  // TODO: 加上千分位，例如 1200 要變成 NT$ 1,200
  return `NT$ ${price}`
}

const lines = readFileSync(0, 'utf8').split('\n').filter((line) => line.trim() !== '')
for (const line of lines) {
  console.log(useFormatPrice(Number(line)))
}
