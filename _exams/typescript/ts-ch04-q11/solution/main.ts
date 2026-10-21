type Order = {
  item: string;
  price: number;
  coupon?: number;
};

type OrderCallback = (item: string, text: string) => void;

function applyDiscounts(price: number, ...rates: number[]): number {
  let result = price;
  for (const rate of rates) {
    result = result * rate;
  }
  return Math.round(result);
}

function formatPrice(amount: number, currency = "NT$"): string {
  return `${currency} ${amount}`;
}

function processOrder({ item, price, coupon }: Order, onDone: OrderCallback) {
  let final = applyDiscounts(price, 0.9);
  if (coupon) {
    final = applyDiscounts(price, 0.9, coupon);
  }
  onDone(item, formatPrice(final));
}

processOrder({ item: "耳機", price: 2000 }, (item, text) => {
  console.log(`${item}：${text}`);
});
processOrder({ item: "喇叭", price: 3500, coupon: 0.8 }, (item, text) => {
  console.log(`${item}：${text}`);
});
