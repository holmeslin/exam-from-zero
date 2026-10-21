export type Product = {
  name: string
  price: number
}

// 型別守衛：value 是 { name: string, price: number } 才回傳 true
export function isProduct(value: unknown): value is Product {
  return true
}

// data 必須是陣列、而且每個元素都是 Product，否則丟出 Error("資料格式不對")
export function parseProducts(data: unknown): Product[] {
  return data as Product[]
}
