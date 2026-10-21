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

export async function loadProducts(url: string): Promise<Product[]> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`讀取失敗：${response.status}`)
  }
  const data: unknown = await response.json()
  if (!Array.isArray(data) || !data.every(isProduct)) {
    throw new Error('資料格式不對')
  }
  return data
}

export async function showProducts(list: HTMLElement, url: string): Promise<void> {
  try {
    const products = await loadProducts(url)
    for (const product of products) {
      const item = document.createElement('li')
      item.textContent = `${product.name}：${product.price} 元`
      list.append(item)
    }
  } catch (error) {
    list.textContent = '讀取失敗，請稍後再試'
    console.error(error)
  }
}
