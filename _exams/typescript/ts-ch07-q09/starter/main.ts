interface Discount {
  name: string;
  apply(price: number): number;
}

class PercentOff implements Discount {
  readonly name: string;
  readonly #rate: number;

  constructor(rate: number) {
    this.#rate = rate;
    this.name = ""; // TODO：「打 9 折」這種格式
  }

  apply(price: number): number {
    return price; // TODO：乘以折數後四捨五入
  }
}

class FixedOff implements Discount {
  readonly name: string;
  readonly #amount: number;

  constructor(amount: number) {
    this.#amount = amount;
    this.name = ""; // TODO：「折 100 元」這種格式
  }

  apply(price: number): number {
    return price; // TODO：減掉折抵金額，最低是 0
  }
}

class Cart {
  // TODO：用 # 私有欄位存放商品

  add(name: string, price: number): void {
    // TODO
  }

  total(discount?: Discount): number {
    // TODO：加總價格，有傳 discount 就套用折扣
    return 0;
  }
}

// 以下是測試程式碼，不要修改
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
