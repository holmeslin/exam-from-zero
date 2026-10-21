interface Discount {
  name: string;
  apply(price: number): number;
}

class PercentOff implements Discount {
  readonly name: string;
  readonly #rate: number;

  constructor(rate: number) {
    this.#rate = rate;
    this.name = `打 ${rate * 10} 折`;
  }

  apply(price: number): number {
    return Math.round(price * this.#rate);
  }
}

class FixedOff implements Discount {
  readonly name: string;
  readonly #amount: number;

  constructor(amount: number) {
    this.#amount = amount;
    this.name = `折 ${amount} 元`;
  }

  apply(price: number): number {
    return Math.max(price - this.#amount, 0);
  }
}

class Cart {
  #items: { name: string; price: number }[] = [];

  add(name: string, price: number): void {
    this.#items.push({ name, price });
  }

  total(discount?: Discount): number {
    let sum = 0;
    for (const item of this.#items) {
      sum += item.price;
    }
    if (discount) {
      return discount.apply(sum);
    }
    return sum;
  }
}

const cart = new Cart();
cart.add("咖啡豆", 450);
cart.add("濾杯", 300);
cart.add("馬克杯", 199);

const discounts: Discount[] = [
  new PercentOff(0.9),
  new PercentOff(0.85),
  new FixedOff(100),
  new FixedOff(1000),
];

console.log(`原價：${cart.total()} 元`);
for (const discount of discounts) {
  console.log(`${discount.name}：${cart.total(discount)} 元`);
}
