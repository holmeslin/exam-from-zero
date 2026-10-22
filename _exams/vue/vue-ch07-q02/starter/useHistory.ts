import { ref, watch, type Ref, type WatchSource } from 'vue'

// 這個 composable 不用改：每次 source 變化，就把新值記到 history 裡
export function useHistory<T>(source: WatchSource<T>) {
  const history = ref([]) as Ref<T[]> // 不寫成 ref<T[]>()：泛型 T 會被 Vue 的 UnwrapRef 拆開，型別對不上
  watch(source, (value) => {
    history.value.push(value)
  })
  return history
}
