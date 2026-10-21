import { useSearchParams } from 'react-router'
import { products } from './products.ts'

const categories = ['all', 'keyboard', 'mouse']

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category') ?? 'all'

  // TODO: 依照 category 篩選
  const visible = products

  return (
    <>
      <p>
        {categories.map((name) => (
          <button key={name} disabled={name === category} onClick={() => setSearchParams({ category: name })}>
            {name}
          </button>
        ))}
      </p>
      <ul>
        {visible.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </>
  )
}
