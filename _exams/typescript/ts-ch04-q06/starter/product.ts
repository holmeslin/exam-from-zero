export type Product = {
  title: string;
  price: number;
  stock?: number;
};

export function describeProduct({ title: string, price: number, stock: number }) {
  return `${title}：${price} 元，庫存 ${stock} 個`;
}
