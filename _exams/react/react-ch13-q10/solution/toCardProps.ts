export class BookRecord {
  id: string
  title: string
  likes: number
  internalNote: string

  constructor(id: string, title: string, likes: number, internalNote: string) {
    this.id = id
    this.title = title
    this.likes = likes
    this.internalNote = internalNote
  }

  label() {
    return `${this.title}（${this.likes}）`
  }
}

export function toCardProps(book: BookRecord) {
  return { id: book.id, title: book.title, likes: book.likes }
}
