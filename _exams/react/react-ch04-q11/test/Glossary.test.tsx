import { render } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import { Glossary } from './Glossary.tsx'

test('dt、dd 相鄰而且沒有 key 警告', () => {
  const error = vi.spyOn(console, 'error').mockImplementation(() => {})
  const { container } = render(<Glossary />)
  const dl = container.querySelector('dl')
  const tags = Array.from(dl!.children).map((el) => `${el.tagName}:${el.textContent}`)
  expect(tags, '<dl> 裡要直接是 dt、dd 交錯，不能多包一層').toEqual([
    'DT:元件',
    'DD:回傳畫面的函式',
    'DT:props',
    'DD:傳給元件的資料',
  ])
  const keyWarning = error.mock.calls.some((args) => String(args[0]).includes('key'))
  error.mockRestore()
  expect(keyWarning, 'React 警告缺少 key：簡寫 <> 不能加 key，要改用 <Fragment key={term.id}>').toBe(false)
})
