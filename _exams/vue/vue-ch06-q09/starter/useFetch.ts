import { onWatcherCleanup, ref, watch, type MaybeRefOrGetter } from 'vue'

// TODO：url 可能是普通字串、ref 或 getter，
// ref 或 getter 的值改變時要重新抓資料（提示：toValue）
export function useFetch(url: MaybeRefOrGetter<string>) {
  const data = ref<any>(null)
  const loading = ref(false)
  const error = ref('')

  watch(
    () => url as string,
    async (currentUrl) => {
      let stale = false
      onWatcherCleanup(() => {
        stale = true
      })

      loading.value = true
      error.value = ''
      data.value = null

      try {
        const response = await fetch(currentUrl)
        if (!response.ok) {
          throw new Error(`伺服器回應失敗：${response.status}`)
        }
        const json = await response.json()
        if (stale) return
        data.value = json
      } catch (e) {
        if (stale) return
        error.value = (e as Error).message
      }

      loading.value = false
    },
    { immediate: true },
  )

  return { data, loading, error }
}
