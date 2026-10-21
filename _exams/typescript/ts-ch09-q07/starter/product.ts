export type Product = {
  name: string;
  price: number;
};

export function formatPrice(product: Product): string {
  return `${product.name}：${product.price} 元`;
}
