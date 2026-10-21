// 由 app/components/ 底下的相對路徑，算出 Nuxt 自動匯入的元件名稱
export function componentName(file: string): string {
  return file
    .replace(/\.vue$/, '')
    .split('/')
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join('')
}
