type Product = { id: number; name: string; inStock: boolean }

export function ProductList({ products }: { products: Product[] }) {
  const available = products.filter((product) => product.inStock)

  if (available.length === 0) {
    return <p>目前沒有商品。</p>
  }
  return (
    <ul>
      {available.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  )
}
