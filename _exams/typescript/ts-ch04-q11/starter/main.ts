type Order = {
  item: string;
  price: number;
  coupon?: number;
};

type OrderCallback = (item: string, text: string) => void;

// TODO: 把 price 依序乘上每一個折扣，最後四捨五入
function applyDiscounts(price: number, rate: number): number {
  return price;
}

// TODO: currency 沒傳時用 "NT$"
function formatPrice(amount: number, currency: string): string {
  return `${currency} ${amount}`;
}

function processOrder({ item, price, coupon }: Order, onDone: OrderCallback) {
  // TODO: 先打 9 折；有 coupon 時再乘上 coupon
  const final = applyDiscounts(price, 0.9);
  onDone(item, formatPrice(final));
}

processOrder({ item: "耳機", price: 2000 }, (item, text) => {
  console.log(`${item}：${text}`);
});
processOrder({ item: "喇叭", price: 3500, coupon: 0.8 }, (item, text) => {
  console.log(`${item}：${text}`);
});
