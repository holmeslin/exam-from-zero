import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import DataList from './DataList.vue'

const products = [
  { id: 1, name: '鍵盤' },
  { id: 2, name: '滑鼠' },
]

test('item slot 要拿到 item 和 index', () => {
  const w = mount(DataList, {
    props: { items: products },
    slots: {
      item: ({ item, index }: { item: { name: string }; index: number }) => `${index + 1}. ${item.name}`,
    },
  })
  const lis = w.findAll('li').map((li) => li.text())
  expect(lis, '每一筆應該由父元件決定樣子，例如「1. 鍵盤」').toEqual(['1. 鍵盤', '2. 滑鼠'])
})

test('沒有資料時顯示 empty slot', () => {
  const w = mount(DataList, { props: { items: [] }, slots: { empty: () => '購物車是空的' } })
  expect(w.find('p').text(), '有給 empty slot 時要顯示它的內容').toBe('購物車是空的')
})

test('沒有資料又沒給 empty slot 時顯示「沒有資料」', () => {
  const w = mount(DataList, { props: { items: [] } })
  expect(w.find('p').text()).toBe('沒有資料')
})
