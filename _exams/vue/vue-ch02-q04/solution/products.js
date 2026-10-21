export function inStockLabels(products) {
  return products
    .filter((product) => product.inStock)
    .map((product) => `${product.name}：${product.price} 元`);
}
