import { render } from '@testing-library/react'
import { expect, test } from 'vitest'
import { BlogPost } from './BlogPost.tsx'

const description = () => document.head.querySelector('meta[name="description"]')?.getAttribute('content')

test('網頁標題與說明跟著文章變', () => {
  const { rerender } = render(<BlogPost post={{ title: '認識 React', summary: '從零開始學 React' }} />)
  expect(document.title, '網頁標題應該是文章標題').toBe('認識 React')
  expect(description(), '<head> 裡應該有 <meta name="description">，內容是摘要').toBe('從零開始學 React')
  rerender(<BlogPost post={{ title: '認識 Effect', summary: '和外部系統同步' }} />)
  expect(document.title, '換文章後網頁標題應該跟著換').toBe('認識 Effect')
  expect(description(), '換文章後說明應該跟著換').toBe('和外部系統同步')
})
