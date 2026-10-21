import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import { Profile } from './Profile.tsx'

test('過生日與搬家都會更新畫面，其他欄位保持不變', async () => {
  const user = userEvent.setup({ delay: null })
  const { container } = render(<Profile />)
  const p = () => container.querySelector('p')?.textContent
  expect(p()).toBe('小明，20 歲，住在 台北（100）')
  await user.click(screen.getByRole('button', { name: '過生日' }))
  expect(p(), '點「過生日」後年齡應變成 21，畫面要更新').toBe('小明，21 歲，住在 台北（100）')
  await user.click(screen.getByRole('button', { name: '搬家' }))
  expect(p(), '點「搬家」後城市應變成高雄，郵遞區號和年齡不變').toBe('小明，21 歲，住在 高雄（100）')
})
