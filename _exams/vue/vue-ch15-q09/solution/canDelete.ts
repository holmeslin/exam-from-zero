// adminToken：從 useRuntimeConfig(event) 讀到的暗號（沒設定環境變數時是預設的空字串）
// cookie：請求帶來的 admin_token cookie（沒帶時是 undefined）
export function canDelete(adminToken: string, cookie: string | undefined): boolean {
  if (adminToken === "") {
    return false;
  }
  return cookie === adminToken;
}
