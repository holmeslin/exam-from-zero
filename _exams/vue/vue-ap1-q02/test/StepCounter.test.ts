import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import StepCounter from './StepCounter.vue'

test('記錄每次變化，到 10 以上發出 reached', async () => {
  const w = mount(StepCounter, { props: { step: 3 } })
  for (let i = 0; i < 3; i++) await w.find('button').trigger('click')
  expect(w.find('p').text(), '按三次（step 3）後的紀錄不對').toBe('0→3、3→6、6→9')
  expect(w.emitted('reached'), '還沒到 10，不應該發出 reached').toBeUndefined()
  await w.find('button').trigger('click')
  expect(w.find('p').text(), '按四次後的紀錄不對').toBe('0→3、3→6、6→9、9→12')
  expect(w.emitted('reached'), '到 12 時應該發出 reached，並帶上新值 12').toEqual([[12]])
  await w.find('button').trigger('click')
  expect(w.emitted('reached'), '到 15 時應該再發出一次 reached，帶上 15').toEqual([[12], [15]])
})
