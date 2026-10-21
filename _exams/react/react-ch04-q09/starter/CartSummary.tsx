// 購物車是空的（count 為 0）時，畫面上不該出現任何字，
// 但現在會多出一個孤零零的 0。另外，被停用的使用者（disabled 為 true）要整個元件都不畫。
export function CartSummary({ count, disabled = false }: { count: number; disabled?: boolean }) {
  return (
    <div>
      {count && <p>購物車裡有 {count} 件商品</p>}
    </div>
  )
}
