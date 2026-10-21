import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import ItemList from './ItemList.vue'

const products = [
  { id: 1, name: '鍵盤', price: 1200 },
  { id: 2, name: '滑鼠', price: 600 },
]

test('用作用域 slot 決定每一項怎麼顯示', () => {
  const w = mount(ItemList, {
    props: { items: products },
    slots: { default: `<template #default="{ item }">{{ item.name }}：{{ item.price }} 元</template>` },
  })
  const texts = w.findAll('li').map((li) => li.text())
  expect(texts, '每個 <li> 應顯示 slot 的內容，例如「鍵盤：1200 元」').toEqual(['鍵盤：1200 元', '滑鼠：600 元'])
})

test('點一項時發出 select，帶那一整項', async () => {
  const w = mount(ItemList, {
    props: { items: products },
    slots: { default: `<template #default="{ item }">{{ item.name }}</template>` },
  })
  await w.findAll('li')[1]!.trigger('click')
  expect(w.emitted('select'), '點第二項後應發出 select，資料是滑鼠那個物件').toEqual([[products[1]]])
})
