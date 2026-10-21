// pattern 例如 '/books/[id]'，pathname 例如 '/books/2'
// 對得上就回傳 params 物件（例如 { id: '2' }），對不上回傳 null
export function matchRoute(pattern: string, pathname: string): Record<string, string> | null {
  const want = pattern.split('/')
  const got = pathname.split('/')
  if (want.length !== got.length) return null
  const params: Record<string, string> = {}
  for (let i = 0; i < want.length; i++) {
    const seg = want[i]
    if (seg.startsWith('[') && seg.endsWith(']')) {
      if (got[i] === '') return null
      params[seg.slice(1, -1)] = got[i]
    } else if (seg !== got[i]) {
      return null
    }
  }
  return params
}
