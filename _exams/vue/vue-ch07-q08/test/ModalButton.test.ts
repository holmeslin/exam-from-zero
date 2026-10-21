import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { afterEach, expect, test } from 'vitest'
import ModalButton from './ModalButton.vue'

afterEach(() => {
  document.body.innerHTML = ''
})

test('對話框被搬到 <body> 底下，而且照樣能開關', async () => {
  const box = document.createElement('div')
  box.className = 'box'
  document.body.appendChild(box)
  const w = mount(ModalButton, { attachTo: box })

  expect(document.querySelector('.modal'), '還沒按之前不應該有對話框').toBeNull()
  await w.find('button.open').trigger('click')

  const modal = document.querySelector('.modal')
  expect(modal, '按下「打開對話框」後應該出現 .modal').not.toBeNull()
  expect(box.contains(modal), '.modal 不應該留在原本的 .box 裡面').toBe(false)
  expect(modal!.parentElement, '.modal 應該直接放在 <body> 底下').toBe(document.body)

  ;(modal!.querySelector('button.close') as HTMLElement).click()
  await nextTick()
  expect(document.querySelector('.modal'), '按「關閉」後對話框要消失').toBeNull()
  w.unmount()
})
