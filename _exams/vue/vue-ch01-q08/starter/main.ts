const prices = [120, 80, 300, 45];

console.log(`共 ${prices.length} 項`);
// 這行想印最後一項，但結果不對
console.log(`最後一項：${prices[prices.length]} 元`);

for (const price of prices) {
  let total = 0;
  total += price;
  console.log(`總計：${total} 元`);
}
