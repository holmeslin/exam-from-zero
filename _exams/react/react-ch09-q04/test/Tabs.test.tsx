import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { afterEach, expect, test } from 'vitest'
import Tabs from './Tabs.tsx'

afterEach(cleanup)

test('目前這頁的分頁 class 是 "tab tab-on"，其他是 "tab"', () => {
  render(
    <MemoryRouter initialEntries={['/about']}>
      <Tabs />
    </MemoryRouter>,
  )
  expect(screen.getByRole('link', { name: '關於' }).className, '在 /about 時「關於」的 class 應該是 "tab tab-on"').toBe('tab tab-on')
  expect(screen.getByRole('link', { name: '首頁' }).className, '在 /about 時「首頁」的 class 應該是 "tab"').toBe('tab')
})

test('換到首頁時換成首頁亮起', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Tabs />
    </MemoryRouter>,
  )
  expect(screen.getByRole('link', { name: '首頁' }).className, '在 / 時「首頁」的 class 應該是 "tab tab-on"').toBe('tab tab-on')
  expect(screen.getByRole('link', { name: '關於' }).className, '在 / 時「關於」的 class 應該是 "tab"').toBe('tab')
})
