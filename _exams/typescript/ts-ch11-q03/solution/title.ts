export function setTitle(text: string): void {
  const title = document.querySelector('#title')
  if (!title) {
    throw new Error('找不到 #title')
  }
  title.textContent = text
}
