export type Book = { title: string; pages: number }
export type Podcast = { title: string; minutes: number }

export function isBook(item: Book | Podcast): item is Book {
  return 'pages' in item
}

export function totalPages(items: (Book | Podcast)[]): number {
  let total = 0
  for (const book of items.filter(isBook)) {
    total += book.pages
  }
  return total
}
