import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'
import MessagesPage, { getServerSideProps } from './messages'

afterEach(cleanup)

test('getServerSideProps 回傳 { props: { messages, renderedAt } }', async () => {
  const result: any = await getServerSideProps()
  expect(result, '回傳值要有 props 屬性').toHaveProperty('props')
  expect(result.props.messages, 'messages 要是 ["你好", "哈囉"]').toEqual(['你好', '哈囉'])
  expect(typeof result.props.renderedAt, 'renderedAt 要是字串').toBe('string')
  expect(Number.isNaN(Date.parse(result.props.renderedAt)), 'renderedAt 要是 toISOString() 產生的時間').toBe(false)
})

test('props 交給頁面元件後能正確顯示', async () => {
  const result: any = await getServerSideProps()
  render(<MessagesPage {...result.props} />)
  expect(screen.getAllByRole('listitem').map((li) => li.textContent)).toEqual(['你好', '哈囉'])
})
