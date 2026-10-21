function subtotal(price: number, quantity: number) {
  return price * quantity;
}

function formatPrice(amount: number) {
  return `${amount.toFixed(0)} 元`;
}

const items = [
  { name: "筆記本", price: 45, quantity: 3 },
  { name: "原子筆", price: 15, quantity: 10 },
  { name: "橡皮擦", price: 10, quantity: 2 },
];

let total = 0;
for (const item of items) {
  total += subtotal(item.price, item.qty);
}

const discount = "50";
console.log(`總計：${formatPrice(total - discount)}`);
console.log(`共 ${items.length} 項商品`);
