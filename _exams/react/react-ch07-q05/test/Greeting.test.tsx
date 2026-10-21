import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'
import { Greeting, LangContext } from './Greeting.tsx'

afterEach(cleanup)

// 中間這層完全不知道語言設定
function Card({ children }: { children: any }) {
  return <section>{children}</section>
}

test('讀取最近的 Provider 提供的值', () => {
  render(
    <LangContext value="en">
      <Card>
        <Greeting />
      </Card>
    </LangContext>,
  )
  expect(screen.getByRole('paragraph').textContent, 'Provider 提供 en 時應該顯示 Hello').toBe('Hello')
})

test('Provider 提供 zh-TW 時顯示你好', () => {
  render(
    <LangContext value="zh-TW">
      <Greeting />
    </LangContext>,
  )
  expect(screen.getByRole('paragraph').textContent).toBe('你好')
})

test('找不到 Provider 時使用預設值', () => {
  render(<Greeting />)
  expect(screen.getByRole('paragraph').textContent, '沒有 Provider 時應該用預設值 zh-TW，顯示你好').toBe('你好')
})
