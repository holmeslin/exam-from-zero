import { useParams } from 'react-router'
import { products } from './products.ts'

export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find((item) => item.id === id)

  return (
    <>
      <h1>{product.name}</h1>
      <p>售價 {product.price} 元</p>
    </>
  )
}
