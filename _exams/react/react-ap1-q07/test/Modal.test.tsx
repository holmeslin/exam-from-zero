import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, test, vi } from 'vitest'
import { Modal } from './Modal.tsx'

afterEach(cleanup)

test('對話視窗是 document.body 的直接子元素', () => {
  const { container } = render(
    <div style={{ overflow: 'hidden', height: 40 }}>
      <Modal onClose={() => {}}>哈囉</Modal>
    </div>,
  )
  const dialog = screen.getByRole('dialog')
  expect(container.contains(dialog), '對話視窗不應該在原本的容器裡').toBe(false)
  expect(dialog.parentElement, '對話視窗的父元素應該是 document.body').toBe(document.body)
  expect(dialog.textContent).toContain('哈囉')
})

test('按「關閉」會呼叫 onClose，事件也照元件樹冒泡', () => {
  const onClose = vi.fn()
  const onOuterClick = vi.fn()
  render(
    <div onClick={onOuterClick}>
      <Modal onClose={onClose}>哈囉</Modal>
    </div>,
  )
  fireEvent.click(screen.getByRole('button', { name: '關閉' }))
  expect(onClose, '應該呼叫 onClose').toHaveBeenCalledTimes(1)
  expect(onOuterClick, '外層的 onClick 也應該收到冒泡上來的事件').toHaveBeenCalledTimes(1)
})
