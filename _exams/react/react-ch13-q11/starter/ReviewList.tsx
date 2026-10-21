'use client'

export type Review = { id: string; bookId: string; text: string }

export default function ReviewList({ reviews }: { reviews: Promise<Review[]> }) {
  // TODO: 讀出 reviews 這個 Promise 的結果，再列出每則評論
  const list: Review[] = []

  return (
    <ul>
      {list.map((review) => (
        <li key={review.id}>{review.text}</li>
      ))}
    </ul>
  )
}
