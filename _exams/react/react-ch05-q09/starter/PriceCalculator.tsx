import { useState } from 'react'

export function PriceCalculator() {
  const [price, setPrice] = useState('')
  const total = 0 // TODO: 用 price 算出三個的總價

  return (
    <div>
      <input type="number" aria-label="單價" value={price} />
      <button>清除</button>
      <p>三個一共 {total} 元</p>
    </div>
  )
}
