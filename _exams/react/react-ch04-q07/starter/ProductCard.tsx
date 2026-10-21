// TODO: 用解構接收 name、price、isNew（預設 false），
// 畫出 <h2>{name}（新品）</h2>（不是新品就不加「（新品）」）和 <p>{price} 元</p>
export function ProductCard(props: { name: string; price: number; isNew?: boolean }) {
  return (
    <div>
      <h2>商品名稱</h2>
      <p>0 元</p>
    </div>
  )
}
