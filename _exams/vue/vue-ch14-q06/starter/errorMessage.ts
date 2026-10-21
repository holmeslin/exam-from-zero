// $fetch 丟出的錯誤，伺服器回傳的 JSON 放在錯誤物件的 data 裡
export function getErrorMessage(err: unknown): string {
  return '發生錯誤，請稍後再試'
}
