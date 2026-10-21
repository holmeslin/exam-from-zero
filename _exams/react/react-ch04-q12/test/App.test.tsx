import { StrictMode } from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'
import App from './App.tsx'

afterEach(cleanup)

const texts = () => screen.queryAllByText(/^號碼牌/).map((p) => p.textContent)

test('在 StrictMode 底下畫出號碼牌 1、2、3', () => {
  render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
  expect(texts(), 'StrictMode 會把元件多呼叫一次，元件不能改動外面的變數').toEqual(['號碼牌 1', '號碼牌 2', '號碼牌 3'])
})

test('再畫一次結果還是一樣', () => {
  render(<App />)
  expect(texts(), '同樣的輸入要畫出同樣的畫面').toEqual(['號碼牌 1', '號碼牌 2', '號碼牌 3'])
})
