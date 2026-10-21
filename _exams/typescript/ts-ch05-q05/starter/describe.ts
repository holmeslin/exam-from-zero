export type Book = { title: string; pages: number }
export type Podcast = { title: string; minutes: number }

export function describe(item: Book | Podcast): string {
  // TODO: 用 in 分辨書和 Podcast
  return item.title
}
