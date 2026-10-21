// loadUser(url)：用 fetch 取得資料。
//   回應不成功（response.ok 是 false）時，丟出 Error，訊息為「伺服器回應失敗：狀態碼」；
//   成功時回傳 JSON 轉成的物件。
export async function loadUser(url) {
  const response = await fetch(url);
  return response.json;
}

// loadUserName(url)：呼叫 loadUser，回傳使用者名字；
//   失敗時不要丟出錯誤，改成回傳「抓資料失敗：錯誤訊息」。
export async function loadUserName(url) {
  const user = loadUser(url);
  return user.name;
}
