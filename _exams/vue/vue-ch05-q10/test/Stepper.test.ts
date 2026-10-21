import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import Stepper from './Stepper.vue'

test('按 + 和 - 時發出 change 事件，附帶 1 或 -1', async () => {
  const w = mount(Stepper, { props: { count: 5 } })
  await w.find('button.plus').trigger('click')
  await w.find('button.minus').trigger('click')
  expect(w.emitted('change'), '沒有發出 change 事件：用 defineEmits 宣告，再用 emit 發出').toBeTruthy()
  expect(w.emitted('change')).toEqual([[1], [-1]])
})

test('父元件收到事件後自己改資料', async () => {
  const Parent = defineComponent(() => {
    const n = ref(3)
    return () => h(Stepper, { count: n.value, onChange: (d: number) => (n.value += d) })
  })
  const w = mount(Parent)
  await w.find('button.plus').trigger('click')
  await w.find('button.plus').trigger('click')
  expect(w.find('span').text(), '父元件的資料應該變成 5').toBe('5')
})
