import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import Collapsible from './Collapsible.tsx'

test('一開始收起來，點按鈕展開、再點收起', async () => {
  render(
    <Collapsible>
      <p>從一隻貓學寫第一行程式</p>
    </Collapsible>,
  )
  const button = screen.getByRole('button')
  expect(button.textContent, '一開始按鈕文字是「看簡介」').toBe('看簡介')
  expect(screen.queryByText('從一隻貓學寫第一行程式'), '一開始不要顯示 children').toBeNull()

  await userEvent.click(button)
  expect(screen.queryByText('從一隻貓學寫第一行程式'), '點一下之後要顯示 children').not.toBeNull()
  expect(button.textContent, '展開後按鈕文字是「收起來」').toBe('收起來')

  await userEvent.click(button)
  expect(screen.queryByText('從一隻貓學寫第一行程式'), '再點一下要收起 children').toBeNull()
  expect(button.textContent).toBe('看簡介')
})
