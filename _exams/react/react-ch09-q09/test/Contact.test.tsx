import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { afterEach, expect, test } from 'vitest'
import Contact from './Contact.tsx'

afterEach(cleanup)

function renderContact() {
  render(
    <MemoryRouter initialEntries={['/', '/contact']} initialIndex={1}>
      <Routes>
        <Route path="/" element={<h1>首頁</h1>} />
        <Route path="contact" element={<Contact />} />
        <Route path="thanks" element={<h1>謝謝你的來信</h1>} />
      </Routes>
    </MemoryRouter>,
  )
}

const heading = () => screen.getByRole('heading').textContent

test('按送出換到感謝頁', () => {
  renderContact()
  fireEvent.click(screen.getByRole('button', { name: '送出' }))
  expect(heading(), '送出之後應該換到 /thanks（謝謝你的來信）').toBe('謝謝你的來信')
})

test('按回上一頁回到首頁，而且不會送出表單', () => {
  renderContact()
  fireEvent.click(screen.getByRole('button', { name: '回上一頁' }))
  expect(heading(), '按「回上一頁」應該回到 /（首頁），不該跑到感謝頁；表單裡的按鈕預設是什麼 type？').toBe('首頁')
})
