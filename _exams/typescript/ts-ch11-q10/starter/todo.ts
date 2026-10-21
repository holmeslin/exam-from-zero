type Todo = {
  id: number
  text: string
  done: boolean
}

// 待辦清單：
// - 表單送出時新增一筆（去掉前後空白；只有空白就什麼都不做），清空輸入框
// - 每筆是一個 <li>：勾選框、<span> 文字、「刪除」按鈕
// - 勾選（change 事件）後 <span> 加上刪除線（style.textDecoration = "line-through"）
// - 按「刪除」移除那一筆
// - count 顯示「還有 N 件沒做完」
export function setupTodo(
  form: HTMLFormElement,
  input: HTMLInputElement,
  list: HTMLUListElement,
  count: Element,
): void {
  let todos: Todo[] = []
  let nextId = 1

  const render = () => {
    // TODO
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    // TODO
  })

  render()
}
