import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import BookList from './BookList.tsx'

const books = [
  { id: '1', title: '貓咪程式設計', author: '小花' },
  { id: '2', title: '河馬學 React', author: '大河' },
]

test('await getBooks() 之後列出每本書', async () => {
  const getBooks = vi.fn(async () => books)
  // 測試裡沒有 Next.js，直接把 async 元件當函式呼叫、await 它的結果
  const result = BookList({ getBooks })
  expect(result instanceof Promise, 'BookList 要宣告成 async function').toBe(true)
  render(await result)
  expect(getBooks, '要呼叫 getBooks() 讀資料').toHaveBeenCalledTimes(1)
  const items = screen.getAllByRole('listitem').map((li) => li.textContent)
  expect(items).toEqual(['貓咪程式設計（小花）', '河馬學 React（大河）'])
})
