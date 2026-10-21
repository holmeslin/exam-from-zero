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
  // TODO: 用 products 畫出清單
  return (
    <main>
      <h1>商品</h1>
    </main>
  )
}
