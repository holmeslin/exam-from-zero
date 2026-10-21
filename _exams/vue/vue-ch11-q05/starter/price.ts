export function formatPrice(price: number): string {
  return `NT$ ${price.toLocaleString("zh-TW")}`;
}
