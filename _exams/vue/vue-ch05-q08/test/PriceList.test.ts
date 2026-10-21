import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import PriceList from './PriceList.vue'

const names = (w: ReturnType<typeof mount>, sel: string) => w.findAll(`${sel} li`).map((li) => li.text())

test('排序清單由便宜到貴，原本的順序不變', async () => {
  const w = mount(PriceList)
  await w.vm.$nextTick()
  expect(names(w, '.sorted'), '排序後的清單不對').toEqual(['滑鼠', '鍵盤', '螢幕'])
  expect(names(w, '.original'), '原本的清單順序被改掉了：computed 裡不要用會改原陣列的 sort').toEqual(['鍵盤', '滑鼠', '螢幕'])
})

test('總計會跟著資料自動重算', async () => {
  const w = mount(PriceList)
  expect(w.find('p').text(), '總計應該是 1200 + 300 + 5000').toBe('總計 6500 元')
  await w.find('button').trigger('click')
  expect(w.find('p').text(), '加了耳機之後總計沒有重算').toBe('總計 7300 元')
  expect(names(w, '.sorted')).toEqual(['滑鼠', '耳機', '鍵盤', '螢幕'])
  expect(names(w, '.original'), '原本的清單順序被改掉了：computed 裡不要用會改原陣列的 sort').toEqual(['鍵盤', '滑鼠', '螢幕', '耳機'])
})
