import styles from './ProductCard.module.css'

export function ProductCard({ name, price, inStock = true }: { name: string; price: number; inStock?: boolean }) {
  return (
    <div className={inStock ? styles.card : `${styles.card} ${styles.soldOut}`}>
      <h2>{name}</h2>
      <p className={styles.price}>{price} 元</p>
    </div>
  )
}
