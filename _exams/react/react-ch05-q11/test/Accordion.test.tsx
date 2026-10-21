import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import { Accordion } from './Accordion.tsx'

const about = '我們是一間賣電腦周邊的小店。'
const hours = '週一到週五，早上九點到晚上六點。'

test('同一時間只有一個面板展開', async () => {
  const user = userEvent.setup({ delay: null })
  render(<Accordion />)
  expect(screen.queryByText(about), '一開始應展開第一個面板「關於」').not.toBeNull()
  expect(screen.queryByText(hours), '一開始「營業時間」應該是收起的').toBeNull()
  expect(screen.getAllByRole('button', { name: '顯示' }).length, '一開始只有「營業時間」有「顯示」按鈕').toBe(1)

  await user.click(screen.getByRole('button', { name: '顯示' }))
  expect(screen.queryByText(hours), '點「營業時間」的顯示後，它應該展開').not.toBeNull()
  expect(screen.queryByText(about), '另一個面板展開時，「關於」應自動收起').toBeNull()

  await user.click(screen.getByRole('button', { name: '顯示' }))
  expect(screen.queryByText(about), '再點「關於」的顯示，它應該展開').not.toBeNull()
  expect(screen.queryByText(hours), '「營業時間」應自動收起').toBeNull()
})
