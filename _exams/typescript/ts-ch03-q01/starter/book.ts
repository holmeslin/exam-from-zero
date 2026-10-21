export type Book = {
  title: string;
  price: number;
};

// 回傳「書名：價格 元」，例如「小王子：250 元」
export function describe(book: Book): string {
  return "";
}
