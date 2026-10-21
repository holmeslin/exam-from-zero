const cart = [
  { name: "耳機", price: 1500, quantity: 2 },
  { name: "傳輸線", price: 200, quantity: 3 },
  { name: "手機殼", price: 350, quantity: 2 },
];
let total = 0;
let itemCount = 0;
let lowestPrice = 0;
let cheapestName = "";
for (const item of cart) {
  total += item.price * item.quantity;
  itemCount += item.quantity;
  if (cheapestName === "" || item.price < lowestPrice) {
    lowestPrice = item.price;
    cheapestName = item.name;
  }
}
console.log(`共 ${itemCount} 件商品`);
console.log(`總金額：${total} 元`);
let finalAmount = total;
if (total >= 3000) {
  console.log("滿 3000 元，打九折");
  finalAmount = total * 0.9;
} else {
  console.log("未滿 3000 元，不打折");
}
console.log(`應付金額：${finalAmount} 元`);
console.log(`最便宜的商品：${cheapestName}`);
