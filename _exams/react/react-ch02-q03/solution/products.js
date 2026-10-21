export function availableLabels(products) {
  return products
    .filter((product) => product.inStock)
    .map((product) => `${product.name}：${product.price} 元`);
}
