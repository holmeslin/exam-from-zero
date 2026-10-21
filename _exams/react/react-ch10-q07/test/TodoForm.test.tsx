import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, test } from 'vitest'
import { TodoForm } from './TodoForm.tsx'

afterEach(cleanup)

test('輸入後按「新增」會加進清單並清空輸入框', async () => {
  const user = userEvent.setup()
  render(<TodoForm />)
  const input = screen.getByLabelText('待辦事項') as HTMLInputElement
  await user.type(input, '  買牛奶 ')
  expect(input.value, '輸入框要顯示打進去的字（handleChange 要 setText）').toBe('  買牛奶 ')
  await user.click(screen.getByRole('button', { name: '新增' }))
  expect(screen.getAllByRole('listitem').map((li) => li.textContent), '清單內容（要去掉頭尾空白）').toEqual(['買牛奶'])
  expect(input.value, '新增後輸入框要清空').toBe('')
  expect(screen.getByText('共 1 項')).toBeTruthy()
})

test('新增後輸入框重新取得焦點', async () => {
  const user = userEvent.setup()
  render(<TodoForm />)
  const input = screen.getByLabelText('待辦事項')
  await user.type(input, '寫作業')
  await user.click(screen.getByRole('button', { name: '新增' }))
  expect(document.activeElement, '送出後要用 inputRef.current?.focus() 讓輸入框取得焦點').toBe(input)
})

test('空白內容不會新增', async () => {
  const user = userEvent.setup()
  render(<TodoForm />)
  const input = screen.getByLabelText('待辦事項')
  await user.type(input, '寫作業')
  await user.click(screen.getByRole('button', { name: '新增' }))
  await user.type(input, '   ')
  await user.click(screen.getByRole('button', { name: '新增' }))
  expect(screen.getAllByRole('listitem').map((li) => li.textContent), '只有空白的內容不該被加進清單').toEqual(['寫作業'])
  expect(screen.getByText('共 1 項')).toBeTruthy()
})
