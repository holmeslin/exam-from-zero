import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import TextField from './TextField.vue'

test('type 和 placeholder 要落在 <input> 上，不是 <label>', () => {
  const w = mount(TextField, {
    props: { label: '信箱', modelValue: '' },
    attrs: { type: 'email', placeholder: 'you@example.com' },
  })
  const input = w.find('input')
  const label = w.find('label')
  expect(input.attributes('type'), '<input> 應該拿到 type="email"').toBe('email')
  expect(input.attributes('placeholder'), '<input> 應該拿到 placeholder').toBe('you@example.com')
  expect(label.attributes('placeholder'), '<label> 不應該拿到 placeholder').toBeUndefined()
  expect(label.attributes('type'), '<label> 不應該拿到 type').toBeUndefined()
  expect(w.text()).toContain('信箱')
})

test('v-model 照常運作', async () => {
  const w = mount(TextField, {
    props: { label: '名字', modelValue: '', 'onUpdate:modelValue': (v: string) => w.setProps({ modelValue: v }) },
  })
  await w.find('input').setValue('小明')
  expect(w.props('modelValue')).toBe('小明')
})
