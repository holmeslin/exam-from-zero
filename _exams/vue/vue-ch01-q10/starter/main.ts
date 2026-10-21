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
  // TODO：算出小計並印出「名稱 × 數量 = 小計 元」，同時累加 total、count，並找出單價最高的商品
}

console.log(`共 ${count} 件商品`);
console.log(`總金額：${total} 元`);
// TODO：滿 3000 元打九折，否則不打折，印出應付金額
console.log(`最貴的商品：${mostExpensiveName}`);
