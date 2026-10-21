import { createContext, useContext, useReducer } from 'react'

export type Task = { id: number; text: string; done: boolean }

export function tasksReducer(tasks: Task[], action: any): Task[] {
  switch (action.type) {
    case 'added':
      return [...tasks, { id: action.id, text: action.text, done: false }]
    case 'toggled':
      return tasks.map((task) =>
        task.id === action.id ? { ...task, done: !task.done } : task,
      )
    case 'deleted':
      return tasks.filter((task) => task.id !== action.id)
    default:
      throw new Error(`未知的 action：${action.type}`)
  }
}

const TasksContext = createContext<Task[] | null>(null)
const TasksDispatchContext = createContext<any>(null)

export function TasksProvider({ initialTasks, children }: { initialTasks: Task[]; children: any }) {
  // TODO: 用 useReducer(tasksReducer, initialTasks) 管理資料，
  // 再把 tasks 和 dispatch 分別放進 TasksContext 與 TasksDispatchContext
  return <>{children}</>
}

export function useTasks(): Task[] {
  // TODO: 讀取 TasksContext
  throw new Error('useTasks 還沒寫')
}

export function useTasksDispatch(): (action: any) => void {
  // TODO: 讀取 TasksDispatchContext
  throw new Error('useTasksDispatch 還沒寫')
}
