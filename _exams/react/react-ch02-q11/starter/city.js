// 回傳使用者的城市；user 本身、address 或 city 不存在時回傳「未填寫」。
// 注意：city 是空字串 "" 時要保留空字串，不能換成「未填寫」。
export function getCity(user) {
  return user.address.city || "未填寫";
}
