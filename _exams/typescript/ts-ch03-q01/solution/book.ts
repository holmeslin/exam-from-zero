export type Book = {
  title: string;
  price: number;
};

export function describe(book: Book): string {
  return `${book.title}：${book.price} 元`;
}
