import { expect, test } from 'vitest'
import { addTaxFromInput } from './tax.ts'

test('回傳加稅後的數字', () => {
  expect(typeof addTaxFromInput('100'), '回傳值必須是 number，不是字串').toBe('number')
  expect(addTaxFromInput('100'), 'addTaxFromInput("100")').toBe(105)
  expect(addTaxFromInput('200'), 'addTaxFromInput("200")').toBe(210)
  expect(addTaxFromInput('0'), 'addTaxFromInput("0")').toBe(0)
})
