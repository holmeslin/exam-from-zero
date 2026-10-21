// file 是 docs/ 底下的相對路徑，例如 "api-examples.md"、"guide/intro.md"
export function routeOf(file: string): string {
  throw new Error('TODO: 回傳這個 .md 檔對應的網址')
}

export function htmlOf(file: string): string {
  throw new Error('TODO: 回傳建置後產生的 .html 檔名')
}
