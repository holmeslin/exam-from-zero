// 回傳有庫存商品的標籤陣列，例如 ["鍵盤：1200 元", "螢幕：5000 元"]
export function availableLabels(products) {
  return products.map((product) => product.name);
}
