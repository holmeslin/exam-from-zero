import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Greeting from './Greeting.vue'

test('greets by name', () => {
  const w = mount(Greeting, { props: { name: 'ada' } })
  expect(w.text()).toBe('Hello, ada!')
})
