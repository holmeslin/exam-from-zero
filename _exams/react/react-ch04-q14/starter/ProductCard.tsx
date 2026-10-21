import styles from './ProductCard.module.css'

// 這個元件已經匯入了 CSS Modules 的 styles，卻還在用寫死的 class 字串，樣式套不上去。
// 請改用 styles：外框用 card，售完時再加上 soldOut；價格用 price。
export function ProductCard({ name, price, inStock = true }: { name: string; price: number; inStock?: boolean }) {
  return (
    <div className={inStock ? 'card' : 'card sold-out'}>
      <h2>{name}</h2>
      <p className="price">{price} 元</p>
    </div>
  )
}
