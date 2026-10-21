// 模擬 Nuxt 的 callOnce：同一個名字（key）的函式只執行一次
export function createCallOnce() {
  return async function callOnce(key: string, fn: () => unknown): Promise<void> {
    // TODO: 同一個 key 只能執行一次 fn
    await fn()
  }
}
