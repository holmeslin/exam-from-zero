type Product = { name: string; price: number }
type Props = { products: Product[] }

export const getServerSideProps = async () => {
  const products: Product[] = [
    { name: '鉛筆', price: 10 },
    { name: '筆記本', price: 45 },
  ]
  return { props: { products } }
}

export default function ProductsPage({ products }: Props) {
  return (
    <main>
      <h1>商品</h1>
      <ul>
        {products.map((product) => (
          <li key={product.name}>
            {product.name}：{product.price} 元
          </li>
        ))}
      </ul>
    </main>
  )
}
