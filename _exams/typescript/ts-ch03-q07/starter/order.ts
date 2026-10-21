export type Order = {
  id: number;
  items: { name: string; price: number; quantity: number }[];
};

// 回傳這筆訂單裡所有商品的名稱
export function itemNames(order: Order): string[] {
  return [];
}

// 回傳訂單總金額：每項商品的 price × quantity 加起來
export function orderTotal(order: Order): number {
  return 0;
}
