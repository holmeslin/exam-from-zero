type Product = { id: number; name: string };

type ProductListProps = {
  products: Product[];
  onSelect: (id: number) => void;
  emptyText?: string;
};

export function ProductList({ products, onSelect, emptyText }: ProductListProps) {
  // TODO: 沒有商品時顯示 emptyText（沒傳就用「沒有商品」）
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <button onClick={() => onSelect(product.name)}>{product.name}</button>
        </li>
      ))}
    </ul>
  );
}
