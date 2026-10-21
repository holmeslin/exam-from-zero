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
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks)
  return (
    <TasksContext value={tasks}>
      <TasksDispatchContext value={dispatch}>{children}</TasksDispatchContext>
    </TasksContext>
  )
}

export function useTasks(): Task[] {
  return useContext(TasksContext)!
}

export function useTasksDispatch(): (action: any) => void {
  return useContext(TasksDispatchContext)
}
