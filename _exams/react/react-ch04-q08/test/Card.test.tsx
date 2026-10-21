import { render } from '@testing-library/react'
import { expect, test } from 'vitest'
import { Card } from './Card.tsx'

test('標題後面接著標籤中間的內容', () => {
  const { container } = render(
    <Card title="今日特價">
      <p>機械鍵盤九折</p>
      <p>無線滑鼠八折</p>
    </Card>,
  )
  const section = container.querySelector('section.card')
  expect(section, '最外層要是 <section className="card">').not.toBeNull()
  const kids = Array.from(section!.children).map((el) => el.textContent)
  expect(kids, '<section> 裡要依序是 <h2> 標題，再接 children').toEqual(['今日特價', '機械鍵盤九折', '無線滑鼠八折'])
})

test('children 可以是文字', () => {
  const { container } = render(<Card title="提醒">明天公休</Card>)
  expect(container.querySelector('section')?.textContent).toBe('提醒明天公休')
})

test('沒有 children 也不會出錯', () => {
  const { container } = render(<Card title="空的" />)
  expect(container.querySelector('section')?.textContent).toBe('空的')
})
