'use client'

import { use } from 'react'

export type Review = { id: string; bookId: string; text: string }

export default function ReviewList({ reviews }: { reviews: Promise<Review[]> }) {
  const list = use(reviews)

  return (
    <ul>
      {list.map((review) => (
        <li key={review.id}>{review.text}</li>
      ))}
    </ul>
  )
}
