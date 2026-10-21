import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Counter from './Counter.vue'

test('increments on click', async () => {
  const w = mount(Counter)
  await w.get('button').trigger('click')
  expect(w.get('button').text()).toBe('1')
})
