import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'
import Guestbook from './Guestbook'

afterEach(cleanup)

test('列出 loaderData.messages', () => {
  render(<Guestbook loaderData={{ messages: [{ name: '小明', text: '你好' }, { name: '小華', text: '哈囉' }] }} />)
  expect(screen.getAllByRole('listitem').map((li) => li.textContent)).toEqual(['小明：你好', '小華：哈囉'])
  expect(screen.queryByRole('alert'), '沒有 actionData 時不該顯示錯誤').toBeNull()
})

test('actionData 有錯誤時顯示 role="alert"', () => {
  render(<Guestbook loaderData={{ messages: [] }} actionData={{ error: '請輸入名字與留言' }} />)
  expect(screen.getByRole('alert').textContent).toBe('請輸入名字與留言')
})

test('actionData.error 是 null 時不顯示錯誤', () => {
  render(<Guestbook loaderData={{ messages: [] }} actionData={{ error: null }} />)
  expect(screen.queryByRole('alert')).toBeNull()
})
