// 回傳一個新物件：以 defaults 為底，overrides 裡有的屬性要蓋掉 defaults。
// 不能改動 defaults 和 overrides。
export function mergeSettings(defaults, overrides) {
  return { ...overrides, ...defaults };
}
