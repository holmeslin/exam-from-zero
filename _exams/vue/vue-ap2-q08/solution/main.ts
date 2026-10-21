import { readFileSync } from 'node:fs'

export function useFormatPrice(price: number): string {
  return `NT$ ${price.toLocaleString('zh-TW')}`
}

const lines = readFileSync(0, 'utf8').split('\n').filter((line) => line.trim() !== '')
for (const line of lines) {
  console.log(useFormatPrice(Number(line)))
}
