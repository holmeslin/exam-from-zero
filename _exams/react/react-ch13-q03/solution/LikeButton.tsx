'use client'

import { useState } from 'react'

export default function LikeButton({ initialLikes }: { initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes)

  return <button onClick={() => setLikes(likes + 1)}>👍 {likes}</button>
}
