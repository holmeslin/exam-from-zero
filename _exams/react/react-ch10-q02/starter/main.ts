import { readFileSync } from 'node:fs'

function total(price: number, quantity: number, shipping: number): number {
  return price * quantity + shipping
}

const lines = readFileSync(0, 'utf8').trim().split('\n')
for (const line of lines) {
  const [price, quantity, shipping] = line.split(' ')
  // TODO: split 拿到的是字串，傳進 total 之前要先轉成數字
  console.log(`總共 ${total(price, quantity, shipping)} 元`)
}
