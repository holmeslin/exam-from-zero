const cart = [
  { name: "耳機", price: 890, quantity: 1 },
  { name: "充電線", price: 150, quantity: 4 },
  { name: "手機殼", price: 320, quantity: 2 },
];

let total = 0;
let count = 0;
let highestPrice = 0;
let mostExpensiveName = "";

for (const item of cart) {
  const subtotal = item.price * item.quantity;
  console.log(`${item.name} × ${item.quantity} = ${subtotal} 元`);
  total += subtotal;
  count += item.quantity;
  if (item.price > highestPrice) {
    highestPrice = item.price;
    mostExpensiveName = item.name;
  }
}

console.log(`共 ${count} 件商品`);
console.log(`總金額：${total} 元`);
let finalAmount = total;
if (total >= 3000) {
  console.log("滿 3000 元，打九折");
  finalAmount = total * 0.9;
} else {
  console.log("未滿 3000 元，不打折");
}
console.log(`應付金額：${finalAmount} 元`);
console.log(`最貴的商品：${mostExpensiveName}`);
