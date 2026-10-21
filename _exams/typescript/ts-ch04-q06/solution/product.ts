export type Product = {
  title: string;
  price: number;
  stock?: number;
};

export function describeProduct({ title, price, stock = 0 }: Product): string {
  return `${title}：${price} 元，庫存 ${stock} 個`;
}
