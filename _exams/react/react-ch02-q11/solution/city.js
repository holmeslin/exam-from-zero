export function getCity(user) {
  return user?.address?.city ?? "未填寫";
}
