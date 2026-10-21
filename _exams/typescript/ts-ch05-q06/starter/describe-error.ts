export function describeError(problem: Error | string | null): string {
  // TODO: Error 物件讀 message；字串直接用；null 代表沒有錯誤
  return `錯誤：${problem}`
}
