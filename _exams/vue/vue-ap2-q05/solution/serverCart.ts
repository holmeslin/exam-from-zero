import { createPinia, defineStore, setActivePinia } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref<string[]>([])
  function add(name: string) {
    items.value.push(name)
  }
  return { items, add }
})

// 模擬伺服器處理一個請求：adds 裡的每一項，代表頁面上不同元件各自呼叫 useCartStore() 加入的商品
export function handleRequest(adds: string[]): string[] {
  setActivePinia(createPinia())
  for (const name of adds) {
    useCartStore().add(name)
  }
  return [...useCartStore().items]
}
