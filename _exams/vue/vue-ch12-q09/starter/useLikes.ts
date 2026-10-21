// 在 Nuxt 裡 ref 會自動匯入；這裡在 Nuxt 外面執行，所以自己 import
import { ref } from 'vue'

export function useLikes() {
  const likes = ref(0)

  function like() {
    // TODO: 讓讚的數字加 1
  }

  return { likes, like }
}
