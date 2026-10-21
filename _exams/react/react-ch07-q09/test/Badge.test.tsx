import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { useState } from 'react'
import { afterEach, expect, test } from 'vitest'
import { Badge, renderLog } from './Badge.tsx'

afterEach(cleanup)

function Profile() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('小明')
  return (
    <>
      <button onClick={() => setCount(count + 1)}>點了 {count} 次</button>
      <button onClick={() => setName('小華')}>改名</button>
      <Badge label={name} />
    </>
  )
}

test('props 沒變時 Badge 跳過渲染，props 變了才重新渲染', () => {
  renderLog.length = 0
  render(<Profile />)
  expect(renderLog, '第一次應該渲染一次').toEqual(['小明'])
  fireEvent.click(screen.getByRole('button', { name: /點了/ }))
  fireEvent.click(screen.getByRole('button', { name: /點了/ }))
  expect(renderLog, '父元件重新渲染但 label 沒變，Badge 不應該再渲染（試試 memo）').toEqual(['小明'])
  fireEvent.click(screen.getByRole('button', { name: '改名' }))
  expect(renderLog, 'label 變了，Badge 要重新渲染').toEqual(['小明', '小華'])
  expect(screen.getByText('小華')).toBeTruthy()
})
