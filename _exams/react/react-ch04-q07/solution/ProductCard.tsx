export function ProductCard({ name, price, isNew = false }: { name: string; price: number; isNew?: boolean }) {
  return (
    <div>
      <h2>
        {name}
        {isNew ? '（新品）' : ''}
      </h2>
      <p>{price} 元</p>
    </div>
  )
}
