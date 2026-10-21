import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'
import ProductsPage, { getServerSideProps } from './products'

afterEach(cleanup)

test('用 getServerSideProps 的結果渲染頁面', async () => {
  const { props } = await getServerSideProps()
  render(<ProductsPage {...props} />)
  expect(screen.getAllByRole('listitem').map((li) => li.textContent)).toEqual(['鉛筆：10 元', '筆記本：45 元'])
})

test('元件只依賴 props，換一份資料也要正確顯示', () => {
  render(<ProductsPage products={[{ name: '橡皮擦', price: 5 }]} />)
  expect(screen.getAllByRole('listitem').map((li) => li.textContent)).toEqual(['橡皮擦：5 元'])
})
