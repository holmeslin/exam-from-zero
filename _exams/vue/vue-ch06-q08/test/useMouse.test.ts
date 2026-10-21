import { mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'
import { useMouse } from './useMouse'

const Host = defineComponent({
  setup() {
    const { x, y } = useMouse()
    return () => h('p', `${x.value},${y.value}`)
  },
})

function move(x: number, y: number) {
  const e = new MouseEvent('mousemove', { clientX: x, clientY: y })
  Object.defineProperty(e, 'pageX', { value: x })
  Object.defineProperty(e, 'pageY', { value: y })
  window.dispatchEvent(e)
}

afterEach(() => vi.restoreAllMocks())

test('滑鼠移動時更新 x、y', async () => {
  const w = mount(Host)
  move(30, 40)
  await nextTick()
  expect(w.text(), '移動滑鼠後 x、y 要跟著 event.pageX、event.pageY 變').toBe('30,40')
  w.unmount()
})

test('元件卸載時移除同一個 mousemove 監聽', () => {
  const add = vi.spyOn(window, 'addEventListener')
  const remove = vi.spyOn(window, 'removeEventListener')
  const w = mount(Host)
  const added = add.mock.calls.filter((c) => c[0] === 'mousemove').map((c) => c[1])
  expect(added.length, '元件掛載後應該在 window 上加一個 mousemove 監聽').toBe(1)
  w.unmount()
  const removed = remove.mock.calls.filter((c) => c[0] === 'mousemove').map((c) => c[1])
  expect(removed, '元件卸載後要用 removeEventListener 移除同一個函式').toContain(added[0])
})
