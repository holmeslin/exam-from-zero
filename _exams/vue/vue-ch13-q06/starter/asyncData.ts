export type Payload = Record<string, unknown>;

// 模擬 Nuxt 的 useAsyncData：payload 裡已經有這個 key，就直接用，不要再執行 fn
export async function useAsyncData<T>(
  payload: Payload,
  key: string,
  fn: () => Promise<T>,
): Promise<T> {
  // TODO: 現在每次都重新執行 fn，就像在 setup 裡直接 await $fetch
  return await fn();
}
