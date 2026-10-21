// 模擬 Nuxt 伺服器端的 createError：回傳一個帶有 status 的錯誤物件（這個檔案不用改）
export function createError(options: { status: number; message: string }) {
  const err = new Error(options.message) as Error & { status: number }
  err.status = options.status
  return err
}
