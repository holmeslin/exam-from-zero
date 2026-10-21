type Product = {
  name: string
  price: number
}

function isProduct(value: unknown): value is Product {
  return (
    typeof value === 'object' &&
    value !== null &&
    'name' in value &&
    typeof value.name === 'string' &&
    'price' in value &&
    typeof value.price === 'number'
  )
}

// 用 fetch 讀 url；response.ok 不是 true 就丟出 Error(`讀取失敗：${status}`)；
// 驗證每一筆都是 Product，不對就丟出 Error("資料格式不對")
export async function loadProducts(url: string): Promise<Product[]> {
  const response = await fetch(url)
  return await response.json()
}

// 把每一筆商品加成 list 裡的一個 <li>，文字是「筆記本：45 元」；
// 任何錯誤都接住，list 的文字改成「讀取失敗，請稍後再試」
export async function showProducts(list: HTMLElement, url: string): Promise<void> {
  // TODO
}
