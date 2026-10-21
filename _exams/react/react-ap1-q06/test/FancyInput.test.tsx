import { act, cleanup, render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { afterEach, expect, test } from 'vitest'
import { FancyInput, type FancyHandle } from './FancyInput.tsx'

afterEach(cleanup)

test('ref 只提供 focus 和 clear', () => {
  const ref = createRef<FancyHandle>()
  render(<FancyInput ref={ref} />)
  expect(ref.current, 'ref.current 不應該是 null').not.toBeNull()
  expect(ref.current instanceof HTMLInputElement, 'ref 不應該直接拿到 <input> 元素').toBe(false)
  expect(typeof ref.current!.focus, 'ref.current.focus 應該是函式').toBe('function')
  expect(typeof ref.current!.clear, 'ref.current.clear 應該是函式').toBe('function')
})

test('focus() 讓輸入框取得焦點，clear() 清空文字', () => {
  const ref = createRef<FancyHandle>()
  render(<FancyInput ref={ref} />)
  const input = screen.getByRole('textbox') as HTMLInputElement
  act(() => ref.current!.focus())
  expect(document.activeElement, 'focus() 之後焦點應該在輸入框').toBe(input)
  input.value = '哈囉'
  act(() => ref.current!.clear())
  expect(input.value, 'clear() 之後輸入框應該是空的').toBe('')
})
