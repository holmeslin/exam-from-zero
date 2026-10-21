export async function loadJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`伺服器回應失敗：${response.status}`);
  }
  return await response.json();
}
