export async function loadUser(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`伺服器回應失敗：${response.status}`);
  }
  return await response.json();
}

export async function loadUserName(url) {
  try {
    const user = await loadUser(url);
    return user.name;
  } catch (error) {
    return `抓資料失敗：${error.message}`;
  }
}
