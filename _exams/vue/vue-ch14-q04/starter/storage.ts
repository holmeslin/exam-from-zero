// 模擬 useStorage("data")：getItem 還沒存過時回傳 null（這個檔案不用改）
export type Storage = {
  getItem(key: string): Promise<unknown>
  setItem(key: string, value: unknown): Promise<void>
}
