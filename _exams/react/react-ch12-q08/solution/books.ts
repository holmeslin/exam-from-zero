export type Book = { id: number; title: string }

export const books: Book[] = [
  { id: 1, title: '貓咪的程式課' },
  { id: 2, title: '河馬的資料結構' },
  { id: 3, title: '企鵝的網路世界' },
]

// 回傳每一本書的 params，例如 [{ id: '1' }, ...]
export function generateStaticParams() {
  return books.map((book) => ({ id: String(book.id) }))
}

// id 來自網址
export function getBook(id: string) {
  return books.find((book) => String(book.id) === id)
}
