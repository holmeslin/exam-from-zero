import { readFileSync } from 'node:fs'
import { beforeAll, expect, test } from 'vitest'

beforeAll(() => {
  const html = readFileSync(`${import.meta.dirname}/index.html`, 'utf8')
  document.body.innerHTML = new DOMParser().parseFromString(html, 'text/html').body.innerHTML
})

test('每個輸入框都有關聯的 label', () => {
  const fields = [...document.querySelectorAll<HTMLInputElement | HTMLSelectElement>('input, select')]
  expect(fields.length, '表單元素不該被刪掉').toBeGreaterThanOrEqual(6)
  for (const f of fields) {
    const name = f.id || f.getAttribute('type') || f.tagName
    expect(f.labels?.length ?? 0, `「${name}」沒有關聯的 <label>：用 for 對應 id，或把它包在 <label> 裡`).toBeGreaterThan(0)
  }
})

test('名字與信箱', () => {
  const name = document.querySelector<HTMLInputElement>('#user-name')
  expect(name?.type, '#user-name 要是 type="text"').toBe('text')
  const email = document.querySelector<HTMLInputElement>('#user-email')
  expect(email?.type, '#user-email 要改成 type="email"').toBe('email')
})

test('兩個 radio 是同一組', () => {
  const radios = [...document.querySelectorAll<HTMLInputElement>('input[type=radio]')]
  expect(radios.length, '要有兩個 radio').toBe(2)
  expect(radios.map((r) => r.value), 'radio 的 value 依序是 s、m').toEqual(['s', 'm'])
  expect(radios.map((r) => r.name), '兩個 radio 的 name 都要是 size').toEqual(['size', 'size'])
  radios[0].click()
  radios[1].click()
  expect(radios[0].checked, '同一組裡選了「中」，「小」應該自動取消').toBe(false)
})

test('點「我同意活動辦法」的文字就能打勾', () => {
  const box = document.querySelector<HTMLInputElement>('input[type=checkbox]')!
  const label = box.labels?.[0]
  expect(label, '勾選框要有 <label>').toBeDefined()
  expect(label!.textContent, 'label 的文字要包含「我同意活動辦法」').toContain('我同意活動辦法')
  label!.click()
  expect(box.checked, '點 label 之後應該打勾').toBe(true)
})
