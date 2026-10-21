import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import { BuyButtons } from './BuyButtons.tsx'

test('渲染時不呼叫 onBuy，點了才呼叫並帶入商品名稱', async () => {
  const user = userEvent.setup({ delay: null })
  const onBuy = vi.fn()
  render(<BuyButtons onBuy={onBuy} />)
  expect(onBuy, '還沒點任何按鈕，onBuy 就被呼叫了：是不是多寫了括號？').not.toHaveBeenCalled()
  await user.click(screen.getByRole('button', { name: '買滑鼠' }))
  expect(onBuy, '點「買滑鼠」應呼叫 onBuy("滑鼠") 一次').toHaveBeenCalledTimes(1)
  expect(onBuy).toHaveBeenCalledWith('滑鼠')
  await user.click(screen.getByRole('button', { name: '買鍵盤' }))
  expect(onBuy, '點「買鍵盤」應呼叫 onBuy("鍵盤")').toHaveBeenLastCalledWith('鍵盤')
})
