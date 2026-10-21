// 模擬 Nuxt 的 callOnce：同一個名字（key）的函式只執行一次
export function createCallOnce() {
  const running = new Map<string, Promise<void>>()
  return function callOnce(key: string, fn: () => unknown): Promise<void> {
    let p = running.get(key)
    if (!p) {
      p = Promise.resolve(fn()).then(() => {})
      running.set(key, p)
    }
    return p
  }
}
