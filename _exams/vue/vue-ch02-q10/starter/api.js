// 用 fetch 向 url 要資料：
// - 回應不成功（response.ok 為 false）時，丟出 Error，訊息為「伺服器回應失敗：狀態碼」
// - 成功時回傳轉成物件的 JSON 內容
export async function loadJson(url) {
  // TODO
  const response = fetch(url);
  return response.json;
}
