import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import { TodoApp } from './TodoApp.tsx'

const titles = () => screen.queryAllByRole('listitem').map((li) => li.querySelector('span')?.textContent)
const button = (name: string) => screen.getByRole('button', { name }) as HTMLButtonElement

test('新增、勾選、計數、篩選、清除已完成', async () => {
  const user = userEvent.setup({ delay: null })
  render(<TodoApp />)
  const input = screen.getByPlaceholderText('要做什麼？') as HTMLInputElement
  expect(screen.queryByText('還沒有待辦事項，新增一個吧！'), '沒有事項時應顯示空狀態').not.toBeNull()

  await user.type(input, '   {Enter}')
  expect(titles(), '只有空白時不應新增').toEqual([])

  await user.type(input, '  買牛奶  {Enter}')
  expect(titles(), '按 Enter 應新增「買牛奶」（頭尾空白要去掉）').toEqual(['買牛奶'])
  expect(input.value, '新增後輸入框應清空').toBe('')
  await user.type(input, '寫作業')
  await user.click(button('新增'))
  expect(titles(), '按「新增」應加入「寫作業」').toEqual(['買牛奶', '寫作業'])
  expect(screen.queryByText('還有 2 項未完成'), '兩項都沒完成時應顯示「還有 2 項未完成」').not.toBeNull()
  expect(screen.queryByRole('button', { name: '清除已完成' }), '沒有已完成事項時不應出現「清除已完成」').toBeNull()

  await user.click(screen.getByRole('checkbox', { name: '買牛奶' }))
  expect((screen.getByRole('checkbox', { name: '買牛奶' }) as HTMLInputElement).checked, '勾選後核取方塊應打勾').toBe(true)
  expect(screen.queryByText('還有 1 項未完成'), '勾選一項後應顯示「還有 1 項未完成」').not.toBeNull()

  await user.click(button('未完成'))
  expect(titles(), '「未完成」篩選只顯示沒完成的').toEqual(['寫作業'])
  expect(button('未完成').disabled, '目前選取的篩選按鈕應該停用').toBe(true)
  await user.click(button('已完成'))
  expect(titles(), '「已完成」篩選只顯示完成的').toEqual(['買牛奶'])

  await user.click(button('清除已完成'))
  expect(titles(), '清除已完成後，「已完成」分類應該是空的').toEqual([])
  expect(screen.queryByText('這個分類沒有項目。'), '有事項但分類是空的時應顯示「這個分類沒有項目。」').not.toBeNull()
  expect(screen.queryByRole('button', { name: '清除已完成' }), '沒有已完成事項後按鈕應消失').toBeNull()

  await user.click(button('全部'))
  await user.click(button('刪除 寫作業'))
  expect(titles(), '刪除後清單應該是空的').toEqual([])
  expect(screen.queryByText('還沒有待辦事項，新增一個吧！'), '全部刪光後應顯示空狀態').not.toBeNull()
})
