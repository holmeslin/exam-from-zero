export type Book = {
  id: string
  title: string
}

export const books: Book[] = [
  { id: '1', title: '貓咪的程式課' },
  { id: '2', title: '河馬的資料結構' },
  { id: '3', title: '企鵝的網路世界' },
]

export function getBook(id: string) {
  return books.find((book) => book.id === id)
}

// param 就是 useRoute().params.id 的值
export function findBook(param: string | string[] | undefined) {
  return typeof param === 'string' ? getBook(param) : undefined
}
