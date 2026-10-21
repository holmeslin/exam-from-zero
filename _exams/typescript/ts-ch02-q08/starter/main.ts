const data = JSON.parse('{ "price": "100" }');
const price = data.price;
const total: number = price + 5;

console.log(total.toFixed(2));
