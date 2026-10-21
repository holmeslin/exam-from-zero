export function CartSummary({ count, disabled = false }: { count: number; disabled?: boolean }) {
  if (disabled) {
    return null
  }
  return <div>{count > 0 && <p>購物車裡有 {count} 件商品</p>}</div>
}
