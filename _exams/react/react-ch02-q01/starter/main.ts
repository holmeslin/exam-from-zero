// TODO：讓 ticketPrice 用 return 把票價交出來（不要自己 console.log）
// 規則：未滿 6 歲免費（0），65 歲以上半價，其他照原價；沒給原價時預設 300
function ticketPrice(age, basePrice) {
  console.log(basePrice);
}

console.log(ticketPrice(4));
console.log(ticketPrice(30));
console.log(ticketPrice(70));
console.log(ticketPrice(30, 500));
console.log(ticketPrice(70) + ticketPrice(30));
