export type Order = {
  id: number;
  items: { name: string; price: number; quantity: number }[];
};

export function itemNames(order: Order): string[] {
  return order.items.map((item) => item.name);
}

export function orderTotal(order: Order): number {
  return order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
