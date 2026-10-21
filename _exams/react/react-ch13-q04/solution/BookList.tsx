export type Book = { id: string; title: string; author: string }

export default async function BookList({ getBooks }: { getBooks: () => Promise<Book[]> }) {
  const books = await getBooks()

  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>
          {book.title}（{book.author}）
        </li>
      ))}
    </ul>
  )
}
