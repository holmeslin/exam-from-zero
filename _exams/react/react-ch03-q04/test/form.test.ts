import { screen } from '@testing-library/dom'
import { beforeEach, expect, test } from 'vitest'
import { html } from './form'

beforeEach(() => {
  document.body.innerHTML = html
})

test('名字輸入框和 label 有關聯', () => {
  const input = screen.queryByLabelText(/名字/)
  expect(input, '點「名字：」選不到輸入框：label 的 for 要和輸入框的 id 一樣').not.toBeNull()
  expect(input!.getAttribute('type'), '名字輸入框的 type 應該是 text').toBe('text')
})

test('信箱輸入框和 label 有關聯，而且是 email 類型', () => {
  const input = screen.queryByLabelText(/信箱/)
  expect(input, '點「信箱：」選不到輸入框：label 的 for 要和輸入框的 id 一樣').not.toBeNull()
  expect(input!.getAttribute('type'), '信箱輸入框的 type 應該是 email').toBe('email')
})

test('兩個水果單選按鈕是同一組', () => {
  const apple = screen.queryByLabelText(/蘋果/) as HTMLInputElement | null
  const banana = screen.queryByLabelText(/香蕉/) as HTMLInputElement | null
  expect(apple, '找不到「蘋果」的單選按鈕').not.toBeNull()
  expect(banana, '找不到「香蕉」的單選按鈕').not.toBeNull()
  expect(apple!.name, '同一組單選按鈕的 name 要一樣').toBe(banana!.name)
  expect(apple!.name, '單選按鈕要有 name').not.toBe('')
  apple!.click()
  banana!.click()
  expect(apple!.checked, '選了香蕉之後，蘋果應該自動取消（同一組只能選一個）').toBe(false)
})

test('城市下拉選單保持正確', () => {
  const select = screen.queryByLabelText(/城市/) as HTMLSelectElement | null
  expect(select, '點「城市：」選不到下拉選單').not.toBeNull()
  expect([...select!.options].map((o) => o.value), '下拉選單的選項值應該是 taipei、kaohsiung').toEqual(['taipei', 'kaohsiung'])
})
