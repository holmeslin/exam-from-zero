import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRef } from 'react'
import { expect, test } from 'vitest'
import { MyInput } from './MyInput.tsx'

function App() {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <>
      <MyInput placeholder="你的名字" ref={inputRef} />
      <button onClick={() => inputRef.current?.focus()}>聚焦輸入框</button>
    </>
  )
}

test('父元件的 ref 指到 MyInput 裡的 <input>，按按鈕可以聚焦', async () => {
  const user = userEvent.setup()
  render(<App />)
  await user.click(screen.getByRole('button', { name: '聚焦輸入框' }))
  expect(document.activeElement, '按下「聚焦輸入框」後，游標應該在輸入框裡（ref 要傳給 <input>）').toBe(screen.getByPlaceholderText('你的名字'))
})
