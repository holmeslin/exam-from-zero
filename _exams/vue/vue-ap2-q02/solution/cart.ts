import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref<string[]>([])
  const count = computed(() => items.value.length)

  function add(name: string) {
    items.value.push(name)
  }

  return { items, count, add }
})
