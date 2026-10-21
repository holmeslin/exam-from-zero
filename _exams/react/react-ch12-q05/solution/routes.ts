// 把 app/ 底下的檔案路徑換成網址；不是 page.tsx 的檔案回傳 null
export function pageFileToUrl(file: string): string | null {
  if (file === 'app/page.tsx') return '/'
  if (!file.startsWith('app/') || !file.endsWith('/page.tsx')) return null
  return file.slice('app'.length, -'/page.tsx'.length)
}
