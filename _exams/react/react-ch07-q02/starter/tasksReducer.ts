export type Task = { id: number; text: string; done: boolean }

// 這個 reducer 會直接修改傳進來的 state，請改成回傳新的陣列與物件
export function tasksReducer(tasks: Task[], action: any): Task[] {
  switch (action.type) {
    case 'added': {
      tasks.push({ id: action.id, text: action.text, done: false })
      return tasks
    }
    case 'toggled': {
      const task = tasks.find((t) => t.id === action.id)
      if (task) task.done = !task.done
      return tasks
    }
    case 'deleted': {
      const index = tasks.findIndex((t) => t.id === action.id)
      if (index !== -1) tasks.splice(index, 1)
      return tasks
    }
    default:
      throw new Error(`未知的 action：${action.type}`)
  }
}
