export type Book = { title: string; pages: number }
export type Podcast = { title: string; minutes: number }

export function describe(item: Book | Podcast): string {
  if ('pages' in item) {
    return `${item.title}，共 ${item.pages} 頁`
  }
  return `${item.title}，長 ${item.minutes} 分鐘`
}
