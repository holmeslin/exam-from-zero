export type Book = { title: string; pages: number }
export type Podcast = { title: string; minutes: number }

export function isBook(item: Book | Podcast): item is Book {
  // TODO: 確實檢查，TypeScript 不會幫你驗證這裡寫得對不對
  return true
}

export function totalPages(items: (Book | Podcast)[]): number {
  // TODO: 用 filter(isBook) 留下書，再加總頁數
  return 0
}
