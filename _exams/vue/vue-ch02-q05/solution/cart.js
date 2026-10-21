export function findById(items, id) {
  return items.find((item) => item.id === id);
}

export function hasExpensive(items, limit) {
  return items.some((item) => item.price > limit);
}

export function cartTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
