import { useState } from 'react'

export function PriceCalculator() {
  const [price, setPrice] = useState('')
  const total = Number(price) * 3

  return (
    <div>
      <input
        type="number"
        aria-label="單價"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
      />
      <button onClick={() => setPrice('')}>清除</button>
      <p>三個一共 {total} 元</p>
    </div>
  )
}
