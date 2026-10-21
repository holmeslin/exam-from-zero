type Product = {
  name: string;
  price: number;
};

function formatPrice(product: Product): string {
  return `${product.name}：${product.price} 元`;
}
