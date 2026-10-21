import { act, render, screen } from '@testing-library/react'
import { Suspense } from 'react'
import { expect, test } from 'vitest'
import ReviewList, { type Review } from './ReviewList.tsx'

test('資料還沒到時顯示 fallback，到了之後列出評論', async () => {
  let resolve!: (value: Review[]) => void
  const reviews = new Promise<Review[]>((r) => {
    resolve = r
  })

  await act(async () => {
    render(
      <Suspense fallback={<p>評論載入中……</p>}>
        <ReviewList reviews={reviews} />
      </Suspense>,
    )
  })
  expect(screen.queryByText('評論載入中……'), 'Promise 還沒完成時，要交給 Suspense 顯示 fallback').not.toBeNull()

  await act(async () => {
    resolve([
      { id: 'r1', bookId: '1', text: '貓咪太可愛' },
      { id: 'r2', bookId: '1', text: '範例都跑得起來' },
    ])
    await reviews
  })
  expect(screen.queryByText('評論載入中……')).toBeNull()
  const items = screen.getAllByRole('listitem').map((li) => li.textContent)
  expect(items).toEqual(['貓咪太可愛', '範例都跑得起來'])
})
