// 回傳「名字，年齡 歲，住在城市」。
// user 沒有 age 時年齡用 18；沒有 city 時城市用「未知」。
// 提示：在參數位置直接解構，並設定預設值
export function introduce(user) {
  return `${user.name}，${user.age || 18} 歲，住在${user.city}`;
}
