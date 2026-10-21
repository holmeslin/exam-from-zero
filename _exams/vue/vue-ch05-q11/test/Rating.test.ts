import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import Rating from './Rating.vue'

const shown = (w: ReturnType<typeof mount>) => w.findAll('button').map((b) => b.text()).join('')

test('點第 4 顆星時發出 update:modelValue，值是 4', async () => {
  const w = mount(Rating, { props: { modelValue: 2 } })
  expect(shown(w)).toBe('★★☆☆☆')
  await w.findAll('button')[3].trigger('click')
  expect(w.emitted('update:modelValue'), '沒有通知父元件：用 defineModel 取代自己複製的 ref').toEqual([[4]])
})

test('父元件用 v-model 時雙向同步', async () => {
  const value = ref(1)
  const Parent = defineComponent(() => () =>
    h('div', [
      h(Rating, { modelValue: value.value, 'onUpdate:modelValue': (v: number) => (value.value = v) }),
      h('p', String(value.value)),
    ]),
  )
  const w = mount(Parent)
  await w.findAll('button')[2].trigger('click')
  expect(value.value, '點第 3 顆星，父元件的值應該變成 3').toBe(3)
  expect(shown(w)).toBe('★★★☆☆')
  value.value = 5
  await w.vm.$nextTick()
  expect(shown(w), '父元件把值改成 5，星星應該跟著變').toBe('★★★★★')
})
