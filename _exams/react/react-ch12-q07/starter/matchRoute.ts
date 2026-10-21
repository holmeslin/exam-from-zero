// pattern 例如 '/books/[id]'，pathname 例如 '/books/2'
// 對得上就回傳 params 物件（例如 { id: '2' }），對不上回傳 null
export function matchRoute(pattern: string, pathname: string): Record<string, string> | null {
  // TODO: 一段一段比對；用中括號包起來的那段是變數
  return pattern === pathname ? {} : null
}
