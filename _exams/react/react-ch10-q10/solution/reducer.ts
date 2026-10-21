export type Todo = { id: number; text: string; done: boolean };

export type Action =
  | { type: "add"; id: number; text: string }
  | { type: "toggle"; id: number }
  | { type: "remove"; id: number };

export function reducer(todos: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case "add":
      return [...todos, { id: action.id, text: action.text, done: false }];
    case "toggle":
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo,
      );
    case "remove":
      return todos.filter((todo) => todo.id !== action.id);
  }
}
