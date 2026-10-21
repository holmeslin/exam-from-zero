import { useSearchParams } from 'react-router'
import { products } from './products.ts'

const categories = ['all', 'keyboard', 'mouse']

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category') ?? 'all'

  const visible = category === 'all' ? products : products.filter((product) => product.category === category)

  function choose(name: string) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set('category', name)
      return next
    })
  }

  return (
    <>
      <p>
        {categories.map((name) => (
          <button key={name} disabled={name === category} onClick={() => choose(name)}>
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
