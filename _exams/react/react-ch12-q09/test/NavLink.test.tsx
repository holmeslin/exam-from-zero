import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'
import { NavLink } from './NavLink'

afterEach(cleanup)

function Nav({ pathname }: { pathname: string }) {
  return (
    <nav>
      <NavLink href="/" pathname={pathname}>首頁</NavLink>
      <NavLink href="/books" pathname={pathname}>書籍</NavLink>
      <NavLink href="/about" pathname={pathname}>關於</NavLink>
    </nav>
  )
}

test('連結的 href 正確', () => {
  render(<Nav pathname="/" />)
  expect(screen.getByRole('link', { name: '書籍' }).getAttribute('href')).toBe('/books')
})

test('目前頁面的連結有 aria-current="page"', () => {
  render(<Nav pathname="/about" />)
  expect(screen.getByRole('link', { name: '關於' }).getAttribute('aria-current'), '在 /about 時「關於」的 aria-current').toBe('page')
})

test('其他連結沒有 aria-current 屬性', () => {
  render(<Nav pathname="/about" />)
  expect(screen.getByRole('link', { name: '首頁' }).hasAttribute('aria-current'), '在 /about 時「首頁」不該有 aria-current').toBe(false)
  expect(screen.getByRole('link', { name: '書籍' }).hasAttribute('aria-current'), '在 /about 時「書籍」不該有 aria-current').toBe(false)
})
