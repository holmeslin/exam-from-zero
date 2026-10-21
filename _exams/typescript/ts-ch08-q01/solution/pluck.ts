// 回傳 items 裡每個元素的 key 屬性值，組成新陣列
export function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map((item) => item[key])
}
