import { expect, test } from 'vitest'
import { Ticket } from './ticket.ts'

test('MAX 是類別本身的屬性，值是 3', () => {
  expect((Ticket as any).MAX, '要用 Ticket.MAX 讀得到').toBe(3)
})

test('issue 是 static 方法，依序發出 1、2、3，發完回傳 null', () => {
  expect(typeof (Ticket as any).issue, '要能直接用 Ticket.issue() 呼叫，不用先 new').toBe('function')
  const got = [Ticket.issue(), Ticket.issue(), Ticket.issue(), Ticket.issue(), Ticket.issue()]
  expect(got).toEqual([1, 2, 3, null, null])
})

test('計數藏在 # 私有欄位，外面看不到', () => {
  expect(Object.keys(Ticket), 'Ticket 上不該有公開的 count 之類的屬性（MAX 除外）').toEqual(['MAX'])
})
