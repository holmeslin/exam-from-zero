import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref<string[]>([])
  const count = computed(() => 0) // TODO: 回傳購物車裡有幾件

  function add(name: string) {
    // TODO: 把 name 加進 items
  }

  return { items, count, add }
})
