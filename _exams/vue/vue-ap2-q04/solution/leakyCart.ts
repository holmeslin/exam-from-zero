import { ref } from 'vue'

export function useCart() {
  const items = ref<string[]>([])
  return items
}

// 模擬伺服器處理一個請求：add 是這位使用者要加進購物車的東西
export function handleRequest(add?: string): string[] {
  const cart = useCart()
  if (add) cart.value.push(add)
  return [...cart.value]
}
