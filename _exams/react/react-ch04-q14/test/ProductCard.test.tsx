import { render } from '@testing-library/react'
import { expect, test } from 'vitest'
import styles from './ProductCard.module.css'
import { ProductCard } from './ProductCard.tsx'

test('有現貨：外框用 styles.card，價格用 styles.price', () => {
  const { container } = render(<ProductCard name="機械鍵盤" price={1200} />)
  const card = container.firstElementChild as HTMLElement
  expect(card.className, '外框的 className 要是 styles.card').toBe(styles.card)
  expect(container.querySelector('p')?.className, '價格的 className 要是 styles.price').toBe(styles.price)
})

test('售完：同時套上 styles.card 和 styles.soldOut', () => {
  const { container } = render(<ProductCard name="無線滑鼠" price={600} inStock={false} />)
  const card = container.firstElementChild as HTMLElement
  expect(card.className, '要用樣板字面值把 styles.card 和 styles.soldOut 用空格接起來').toBe(`${styles.card} ${styles.soldOut}`)
})
