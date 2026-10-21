// @vitest-environment jsdom
import { beforeEach, expect, test } from 'vitest'
import { setupTodo } from './todo.ts'

let form: HTMLFormElement
let input: HTMLInputElement
let list: HTMLUListElement
let count: HTMLElement

beforeEach(() => {
  document.body.innerHTML = `
    <form id="todo-form"><input id="todo-input" /><button>新增</button></form>
    <ul id="todo-list"></ul>
    <p id="todo-count"></p>`
  form = document.querySelector('#todo-form') as HTMLFormElement
  input = document.querySelector('#todo-input') as HTMLInputElement
  list = document.querySelector('#todo-list') as HTMLUListElement
  count = document.querySelector('#todo-count') as HTMLElement
  setupTodo(form, input, list, count)
})

function add(text: string) {
  input.value = text
  form.dispatchEvent(new Event('submit', { cancelable: true }))
}

const items = () => [...list.querySelectorAll('li')]

test('一開始顯示「還有 0 件沒做完」', () => {
  expect(count.textContent).toBe('還有 0 件沒做完')
})

test('新增會去掉前後空白、清空輸入框', () => {
  add('  買牛奶  ')
  expect(items().length, '應該有 1 個 <li>').toBe(1)
  expect(items()[0].querySelector('span')?.textContent, '<span> 的文字應該去掉前後空白').toBe('買牛奶')
  expect(input.value, '新增之後要清空輸入框').toBe('')
  expect(count.textContent).toBe('還有 1 件沒做完')
})

test('只有空白不新增', () => {
  add('   ')
  expect(items().length, '只有空白時不應該新增').toBe(0)
})

test('<li> 裡依序是勾選框、文字、刪除按鈕', () => {
  add('寫作業')
  const children = [...items()[0].children]
  expect(children.map((c) => c.tagName), '<li> 的子元素應該是 INPUT、SPAN、BUTTON').toEqual(['INPUT', 'SPAN', 'BUTTON'])
  expect((children[0] as HTMLInputElement).type).toBe('checkbox')
  expect(children[2].textContent).toBe('刪除')
})

test('勾選後加上刪除線、數量減少，再點一次取消', () => {
  add('寫作業')
  add('洗碗')
  const checkbox = () => items()[0].querySelector('input') as HTMLInputElement
  checkbox().checked = true
  checkbox().dispatchEvent(new Event('change'))
  expect((items()[0].querySelector('span') as HTMLElement).style.textDecoration, '勾選後應該有刪除線').toBe('line-through')
  expect(count.textContent).toBe('還有 1 件沒做完')
  checkbox().checked = false
  checkbox().dispatchEvent(new Event('change'))
  expect((items()[0].querySelector('span') as HTMLElement).style.textDecoration, '取消勾選後不應該有刪除線').toBe('')
  expect(count.textContent).toBe('還有 2 件沒做完')
})

test('按刪除移除那一筆', () => {
  add('寫作業')
  add('洗碗')
  ;(items()[0].querySelector('button') as HTMLButtonElement).click()
  expect(items().map((li) => li.querySelector('span')?.textContent), '刪除後只剩「洗碗」').toEqual(['洗碗'])
  expect(count.textContent).toBe('還有 1 件沒做完')
})
