import { expect, test } from 'vitest'
import { getCity } from './city.js'

test('有城市時回傳城市', () => {
  expect(getCity({ name: '小明', address: { city: '台北' } })).toBe('台北')
})

test('沒有 address 時不出錯，回傳「未填寫」', () => {
  expect(() => getCity({ name: '小明' }), '缺 address 不該丟出錯誤，試試 ?.').not.toThrow()
  expect(getCity({ name: '小明' })).toBe('未填寫')
})

test('user 本身是 undefined 或 null 也不出錯', () => {
  expect(getCity(undefined), 'user 是 undefined 應回傳「未填寫」').toBe('未填寫')
  expect(getCity(null), 'user 是 null 應回傳「未填寫」').toBe('未填寫')
})

test('city 是空字串時保留空字串', () => {
  expect(getCity({ address: { city: '' } }), '空字串不是 null/undefined，應原樣回傳；用 ?? 而不是 ||').toBe('')
})
