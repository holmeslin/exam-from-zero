// 由 app/components/ 底下的相對路徑，算出 Nuxt 自動匯入的元件名稱
export function componentName(file: string): string {
  // TODO: 子資料夾的名稱也要加在前面
  const parts = file.replace(/\.vue$/, '').split('/')
  return parts[parts.length - 1]
}
