// root 裡面有：
//   <p id="empty">目前沒有待辦事項</p>
//   <ul id="list"></ul>
//   <p id="summary">共 0 項</p>
export function createTodoApp(root: HTMLElement) {
  const list = root.querySelector('#list') as HTMLElement
  const summary = root.querySelector('#summary') as HTMLElement
  const emptyMessage = root.querySelector('#empty') as HTMLElement
  const todos: string[] = []

  // 依照 todos 重新算出整個畫面：清單、統計文字、空清單提示
  function render() {
    summary.textContent = `共 ${todos.length} 項`
  }

  function addTodo(text: string) {
    todos.push(text)
    render()
  }

  function removeTodo(index: number) {
    todos.splice(index, 1)
    render()
  }

  return { addTodo, removeTodo }
}
