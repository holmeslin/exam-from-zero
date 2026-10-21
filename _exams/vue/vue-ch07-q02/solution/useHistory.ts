import { ref, watch, type WatchSource } from 'vue'

// 這個 composable 不用改：每次 source 變化，就把新值記到 history 裡
export function useHistory<T>(source: WatchSource<T>) {
  const history = ref<T[]>([])
  watch(source, (value) => {
    history.value.push(value)
  })
  return history
}
