import { expect, test } from 'vitest'
import { getLabel } from './label.ts'

test('90 分以上是「優秀」', () => {
  expect(getLabel(95), 'getLabel(95) 應該回傳「優秀」').toBe('優秀')
  expect(getLabel(90), 'getLabel(90) 應該回傳「優秀」').toBe('優秀')
})

test('60 到 89 分是「及格」', () => {
  expect(getLabel(60), 'getLabel(60) 應該回傳「及格」').toBe('及格')
  expect(getLabel(89), 'getLabel(89) 應該回傳「及格」').toBe('及格')
})

test('低於 60 分是「不及格」，不能回傳 undefined', () => {
  expect(getLabel(50), 'getLabel(50) 應該回傳「不及格」').toBe('不及格')
  expect(getLabel(0), 'getLabel(0) 應該回傳「不及格」').toBe('不及格')
})
