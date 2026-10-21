export type Book = { id: string; title: string; author: string }

export default function BookList({ getBooks }: { getBooks: () => Promise<Book[]> }) {
  // TODO: 把元件改成 async，await getBooks() 拿到書，再列出來
  return <ul></ul>
}
