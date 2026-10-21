// cartTotal：回傳 price × quantity 的總和（空購物車是 0）
export function cartTotal(cart) {
  throw new Error('TODO：用 reduce 算出總金額');
}

// allInStock：每一項的 stock 都大於 0 才回傳 true
export function allInStock(cart) {
  return cart.some((item) => item.stock > 0);
}
