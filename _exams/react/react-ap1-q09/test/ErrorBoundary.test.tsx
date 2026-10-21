import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, test, vi } from 'vitest'
import { ErrorBoundary } from './ErrorBoundary.tsx'

afterEach(cleanup)

afterEach(() => vi.restoreAllMocks())

function Bomb(): never {
  throw new Error('爆炸了')
}

test('沒有錯誤時顯示子元件', () => {
  render(
    <ErrorBoundary fallback={<p>出了點問題</p>}>
      <p>一切正常</p>
    </ErrorBoundary>,
  )
  expect(screen.queryByText('一切正常')).not.toBeNull()
  expect(screen.queryByText('出了點問題')).toBeNull()
})

test('子元件丟出錯誤時顯示 fallback', () => {
  vi.spyOn(console, 'error').mockImplementation(() => {})
  let thrown: unknown = null
  try {
    render(
      <div>
        <ErrorBoundary fallback={<p>出了點問題</p>}>
          <Bomb />
        </ErrorBoundary>
        <p>旁邊的內容</p>
      </div>,
    )
  } catch (e) {
    thrown = e
  }
  expect(thrown, `錯誤沒有被接住：${String(thrown)}`).toBeNull()
  expect(screen.queryByText('出了點問題'), '應該顯示 fallback').not.toBeNull()
  expect(screen.queryByText('旁邊的內容'), '錯誤邊界外的內容應該照常顯示').not.toBeNull()
})
