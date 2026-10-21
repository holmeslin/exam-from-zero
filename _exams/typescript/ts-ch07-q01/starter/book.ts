export class Book {
  title: string;
  price: number;
  stock = 0;

  constructor(title: string, price: number) {
    // TODO：把參數存進 this.title 和 this.price
    this.title = "";
    this.price = 0;
  }
}
