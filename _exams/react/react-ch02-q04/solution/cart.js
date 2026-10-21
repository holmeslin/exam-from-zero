export function cartTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function allInStock(cart) {
  return cart.every((item) => item.stock > 0);
}
