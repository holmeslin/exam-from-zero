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
