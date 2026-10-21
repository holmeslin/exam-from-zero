// file 是 docs/ 底下的相對路徑，例如 "api-examples.md"、"guide/intro.md"
export function routeOf(file: string): string {
  if (file === 'index.md') return '/'
  return '/' + file.replace(/\.md$/, '')
}

export function htmlOf(file: string): string {
  return file.replace(/\.md$/, '.html')
}
