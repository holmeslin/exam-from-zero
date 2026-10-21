export type Flags<T> = { [K in keyof T]: boolean }

// 對 current 的每一個屬性，值和 defaults 的同名屬性不同就是 true，相同就是 false
export function diffFlags<T extends object>(current: T, defaults: T): Flags<T> {
  const result = {} as Flags<T>
  for (const key of Object.keys(current) as (keyof T)[]) {
    result[key] = current[key] !== defaults[key]
  }
  return result
}
