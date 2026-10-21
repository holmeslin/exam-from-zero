import { expect, test } from 'vitest'
import { describeCustomer } from './customer.ts'

test('沒有 email 時只有姓名與地址', () => {
  expect(describeCustomer({ name: '小明', address: { city: '台北', zip: '100' } }), '沒有 email 的顧客').toBe('小明（台北 100）')
})

test('有 email 時接在後面', () => {
  expect(
    describeCustomer({ name: '小華', address: { city: '台中', zip: '400' }, email: 'hua@example.com' }),
    '有 email 的顧客應該是「小華（台中 400） <hua@example.com>」',
  ).toBe('小華（台中 400） <hua@example.com>')
})
