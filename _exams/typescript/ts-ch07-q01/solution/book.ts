export class Book {
  title: string;
  price: number;
  stock = 0;

  constructor(title: string, price: number) {
    this.title = title;
    this.price = price;
  }
}
