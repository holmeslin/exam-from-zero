import { expect, test } from 'vitest'
import { componentName } from './componentName'

test('直接放在 components/ 的元件', () => {
  expect(componentName('BookCard.vue')).toBe('BookCard')
})

test('子資料夾名稱加在前面', () => {
  expect(componentName('shop/Banner.vue'), 'shop/Banner.vue 應該是 ShopBanner').toBe('ShopBanner')
})

test('多層子資料夾', () => {
  expect(componentName('shop/sale/Tag.vue'), 'shop/sale/Tag.vue 應該是 ShopSaleTag').toBe('ShopSaleTag')
})
