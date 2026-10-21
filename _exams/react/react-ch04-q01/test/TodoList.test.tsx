import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { TodoList } from './TodoList.tsx'

test('lists every item', () => {
  render(<TodoList items={['買牛奶', '寫作業']} />)
  const items = screen.getAllByRole('listitem')
  expect(items.map((li) => li.textContent)).toEqual(['買牛奶', '寫作業'])
})
