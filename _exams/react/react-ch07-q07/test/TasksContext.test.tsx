import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'
import { TasksProvider, useTasks, useTasksDispatch } from './TasksContext.tsx'

afterEach(cleanup)

const initialTasks = [
  { id: 1, text: '買牛奶', done: true },
  { id: 2, text: '寫程式', done: false },
]

let addRenders = 0

function AddTask() {
  addRenders++
  const dispatch = useTasksDispatch()
  return <button onClick={() => dispatch({ type: 'added', id: 3, text: '運動' })}>新增</button>
}

function TaskList() {
  const tasks = useTasks()
  const dispatch = useTasksDispatch()
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {task.text}
          <button onClick={() => dispatch({ type: 'deleted', id: task.id })}>刪除{task.text}</button>
        </li>
      ))}
    </ul>
  )
}

function Layout({ children }: { children: any }) {
  return <main>{children}</main>
}

function setup() {
  addRenders = 0
  render(
    <TasksProvider initialTasks={initialTasks}>
      <Layout>
        <AddTask />
        <TaskList />
      </Layout>
    </TasksProvider>,
  )
  return () => screen.getAllByRole('listitem').map((li) => li.firstChild!.textContent)
}

test('深處的元件透過自訂 Hook 讀取與更新資料', () => {
  const texts = setup()
  expect(texts(), 'useTasks() 應該拿到 initialTasks').toEqual(['買牛奶', '寫程式'])
  fireEvent.click(screen.getByRole('button', { name: '新增' }))
  expect(texts(), '用 useTasksDispatch() 送出 added 後應該多一項').toEqual(['買牛奶', '寫程式', '運動'])
  fireEvent.click(screen.getByRole('button', { name: '刪除買牛奶' }))
  expect(texts(), '送出 deleted 後應該少一項').toEqual(['寫程式', '運動'])
})

test('只用 dispatch 的元件不會因為 tasks 變了而重新渲染', () => {
  setup()
  const before = addRenders
  fireEvent.click(screen.getByRole('button', { name: '刪除寫程式' }))
  expect(screen.getAllByRole('listitem')).toHaveLength(1)
  expect(addRenders, 'tasks 和 dispatch 要放在兩個不同的 Context，AddTask 才不會跟著重新渲染').toBe(before)
})
