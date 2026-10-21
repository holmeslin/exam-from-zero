import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { expect, test } from 'vitest'
import BaseCard from './BaseCard.vue'

test('三個 slot 都給時，內容各自放到對的位置', () => {
  const w = mount(BaseCard, {
    slots: {
      header: () => '今日待辦',
      default: () => h('ul', [h('li', '買牛奶')]),
      footer: () => h('button', '全部完成'),
    },
  })
  expect(w.find('header').text(), '<header> 裡應該是 header slot 的內容').toBe('今日待辦')
  expect(w.find('.body').text(), '.body 裡應該是預設 slot 的內容').toBe('買牛奶')
  expect(w.find('footer').exists(), '有給 footer 時要畫出 <footer>').toBe(true)
  expect(w.find('footer').text()).toBe('全部完成')
})

test('沒給 header 顯示預設內容，沒給 footer 就不要 <footer>', () => {
  const w = mount(BaseCard, { slots: { default: () => '只有內容' } })
  expect(w.find('header').text(), '沒給 header 時應該顯示「（沒有標題）」').toBe('（沒有標題）')
  expect(w.find('.body').text()).toBe('只有內容')
  expect(w.find('footer').exists(), '沒給 footer 時整個 <footer> 都不應該出現').toBe(false)
})
