import { ref } from 'vue'

// TODO：元件掛載時開始監聽 window 的 mousemove，卸載時移除監聽，
// 並用 event.pageX、event.pageY 更新 x、y
export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  return { x, y }
}
