// @vitest-environment jsdom
import { expect, test } from 'vitest'
import { setupBmi } from './bmi.ts'

function setup(height: string, weight: string) {
  document.body.innerHTML = `
    <form>
      <input id="height" type="number" />
      <input id="weight" type="number" />
      <button>計算 BMI</button>
    </form>
    <p id="result"></p>`
  const form = document.querySelector('form') as HTMLFormElement
  const h = document.querySelector('#height') as HTMLInputElement
  const w = document.querySelector('#weight') as HTMLInputElement
  const result = document.querySelector('#result') as HTMLElement
  setupBmi(form, h, w, result)
  h.value = height
  w.value = weight
  const event = new Event('submit', { cancelable: true })
  form.dispatchEvent(event)
  return { event, result }
}

test('送出時要呼叫 preventDefault()', () => {
  const { event } = setup('170', '65')
  expect(event.defaultPrevented, '沒有呼叫 event.preventDefault()，頁面會重新載入').toBe(true)
})

test('身高 170、體重 65 顯示 BMI：22.5', () => {
  const { result } = setup('170', '65')
  expect(result.textContent).toBe('BMI：22.5')
})

test('有欄位是空的要提示', () => {
  expect(setup('', '65').result.textContent, '身高空白時不能當成 0 計算').toBe('請輸入身高和體重')
  expect(setup('170', '').result.textContent, '體重空白時不能當成 0 計算').toBe('請輸入身高和體重')
})
