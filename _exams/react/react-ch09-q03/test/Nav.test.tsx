import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { afterEach, expect, test } from 'vitest'
import Nav from './Nav.tsx'

afterEach(cleanup)

function renderAt(url: string) {
  render(
    <MemoryRouter initialEntries={[url]}>
      <Nav />
    </MemoryRouter>,
  )
  return {
    list: screen.getByRole('link', { name: '商品列表' }),
    add: screen.getByRole('link', { name: '新增商品' }),
  }
}

test('在 /products 時只有商品列表是 active', () => {
  const { list, add } = renderAt('/products')
  expect(list.classList.contains('active'), '在 /products 時「商品列表」應該有 active').toBe(true)
  expect(add.classList.contains('active'), '在 /products 時「新增商品」不該有 active').toBe(false)
})

test('在 /products/new 時商品列表不是 active', () => {
  const { list, add } = renderAt('/products/new')
  expect(add.classList.contains('active'), '在 /products/new 時「新增商品」應該有 active').toBe(true)
  expect(list.classList.contains('active'), '在 /products/new 時「商品列表」不該有 active，想想 NavLink 預設怎麼比對網址').toBe(false)
})
