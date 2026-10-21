import { useState } from 'react'
import type { FormEvent } from 'react'

type Todo = { id: string; title: string; done: boolean }
type Filter = 'all' | 'active' | 'done'

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: 'active', label: '未完成' },
  { value: 'done', label: '已完成' },
]

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [text, setText] = useState('')
  const [filter, setFilter] = useState<Filter>('all')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // TODO: 去掉頭尾空白，空的不新增；新增後清空輸入框
  }

  function handleToggle(id: string) {
    // TODO: 切換這一項的 done
  }

  function handleDelete(id: string) {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  function handleClearDone() {
    // TODO: 刪掉所有已完成的事項
  }

  const remaining = 0 // TODO: 算出未完成的數量
  const visibleTodos = todos // TODO: 依 filter 篩選

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={text} onChange={(event) => setText(event.target.value)} placeholder="要做什麼？" />
        <button type="submit">新增</button>
      </form>
      <div>
        {FILTERS.map((item) => (
          <button key={item.value} onClick={() => setFilter(item.value)} disabled={filter === item.value}>
            {item.label}
          </button>
        ))}
      </div>
      {todos.length === 0 && <p>還沒有待辦事項，新增一個吧！</p>}
      {todos.length > 0 && visibleTodos.length === 0 && <p>這個分類沒有項目。</p>}
      <ul>
        {visibleTodos.map((todo) => (
          <li key={todo.id}>
            <label>
              <input type="checkbox" checked={todo.done} onChange={() => handleToggle(todo.id)} />
              <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>{todo.title}</span>
            </label>
            <button onClick={() => handleDelete(todo.id)} aria-label={`刪除 ${todo.title}`}>
              刪除
            </button>
          </li>
        ))}
      </ul>
      {todos.length > 0 && <p>還有 {remaining} 項未完成</p>}
      {todos.some((todo) => todo.done) && <button onClick={handleClearDone}>清除已完成</button>}
    </div>
  )
}
