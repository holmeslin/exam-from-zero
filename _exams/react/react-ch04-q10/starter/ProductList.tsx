type Product = { id: number; name: string; inStock: boolean }

// TODO:
// 1. 只列出 inStock 為 true 的商品，每個商品畫成 <li>{name}</li>，key 用 id
// 2. 沒有任何現貨商品時，改成顯示 <p>目前沒有商品。</p>（不要畫 <ul>）
export function ProductList({ products }: { products: Product[] }) {
  return <ul></ul>
}
