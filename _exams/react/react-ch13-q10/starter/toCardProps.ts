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
  // TODO: 類別的實體不能傳給 Client Component，改成只含需要欄位的純物件
  return book
}
