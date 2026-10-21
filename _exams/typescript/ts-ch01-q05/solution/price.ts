export function subtotal(price: number, quantity: number): number {
  return price * quantity;
}

export function formatPrice(amount: number): string {
  return `${amount.toFixed(0)} 元`;
}
