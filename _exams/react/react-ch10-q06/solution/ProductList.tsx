type Product = { id: number; name: string };

type ProductListProps = {
  products: Product[];
  onSelect: (id: number) => void;
  emptyText?: string;
};

export function ProductList({ products, onSelect, emptyText = "沒有商品" }: ProductListProps) {
  if (products.length === 0) {
    return <p>{emptyText}</p>;
  }
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <button onClick={() => onSelect(product.id)}>{product.name}</button>
        </li>
      ))}
    </ul>
  );
}
