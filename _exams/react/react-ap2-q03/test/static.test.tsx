import { expect, test, vi } from 'vitest'
import { getStaticProps } from './about'

test('builtAt 是執行當下的 ISO 時間', async () => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date('2026-01-02T03:04:05.000Z'))
  const result: any = await getStaticProps()
  vi.useRealTimers()
  expect(result.props?.builtAt, 'builtAt 要用 new Date().toISOString()').toBe('2026-01-02T03:04:05.000Z')
})

test('revalidate 設為 10（和 props 同一層）', async () => {
  const result: any = await getStaticProps()
  expect(result.revalidate, 'revalidate 要放在回傳物件最外層，不是放在 props 裡').toBe(10)
  expect(result.props, 'props 裡不該有 revalidate').not.toHaveProperty('revalidate')
})
