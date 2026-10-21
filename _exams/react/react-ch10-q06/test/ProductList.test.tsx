import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, test, vi } from 'vitest'
import { ProductList } from './ProductList.tsx'

afterEach(cleanup)

test('點按鈕時用商品的 id 呼叫 onSelect', () => {
  const onSelect = vi.fn()
  render(<ProductList products={[{ id: 1, name: '鍵盤' }, { id: 2, name: '滑鼠' }]} onSelect={onSelect} />)
  fireEvent.click(screen.getByRole('button', { name: '滑鼠' }))
  expect(onSelect, '點「滑鼠」應該呼叫 onSelect(2)，參數是 id（數字），不是名稱').toHaveBeenCalledWith(2)
})

test('沒有商品時顯示預設文字「沒有商品」', () => {
  render(<ProductList products={[]} onSelect={() => {}} />)
  expect(screen.queryByText('沒有商品'), '空清單又沒傳 emptyText 時，畫面上應該有「沒有商品」').not.toBeNull()
})

test('沒有商品時顯示傳進來的 emptyText', () => {
  render(<ProductList products={[]} onSelect={() => {}} emptyText="購物車是空的" />)
  expect(screen.queryByText('購物車是空的'), '傳了 emptyText 時要顯示它').not.toBeNull()
})
