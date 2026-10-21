// 要測的函式（不用改）
export function formatPrice(price: number): string {
  return `NT$ ${price.toLocaleString("zh-TW")}`;
}
