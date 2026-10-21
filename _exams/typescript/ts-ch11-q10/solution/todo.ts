type Todo = {
  id: number
  text: string
  done: boolean
}

export function setupTodo(
  form: HTMLFormElement,
  input: HTMLInputElement,
  list: HTMLUListElement,
  count: Element,
): void {
  let todos: Todo[] = []
  let nextId = 1

  const createItem = (todo: Todo): HTMLLIElement => {
    const item = document.createElement('li')

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = todo.done
    checkbox.addEventListener('change', () => {
      todos = todos.map((t) => (t.id === todo.id ? { ...t, done: checkbox.checked } : t))
      render()
    })

    const text = document.createElement('span')
    text.textContent = todo.text
    if (todo.done) {
      text.style.textDecoration = 'line-through'
    }

    const removeButton = document.createElement('button')
    removeButton.textContent = '刪除'
    removeButton.addEventListener('click', () => {
      todos = todos.filter((t) => t.id !== todo.id)
      render()
    })

    item.append(checkbox, text, removeButton)
    return item
  }

  const render = () => {
    list.replaceChildren(...todos.map(createItem))
    const left = todos.filter((todo) => !todo.done).length
    count.textContent = `還有 ${left} 件沒做完`
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const text = input.value.trim()
    if (text === '') {
      return
    }
    todos = [...todos, { id: nextId, text, done: false }]
    nextId++
    input.value = ''
    render()
  })

  render()
}
