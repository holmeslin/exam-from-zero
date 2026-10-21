const prices = [120, 80, 300, 45];

console.log(`共 ${prices.length} 項`);
console.log(`最後一項：${prices[prices.length - 1]} 元`);

let total = 0;
for (const price of prices) {
  total += price;
}
console.log(`總計：${total} 元`);
