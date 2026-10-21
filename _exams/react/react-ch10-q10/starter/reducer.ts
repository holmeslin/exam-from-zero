export type Todo = { id: number; text: string; done: boolean };

export type Action =
  | { type: "add"; id: number; text: string }
  | { type: "toggle"; id: number }
  | { type: "remove"; id: number };

export function reducer(todos: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case "add":
      return [...todos, { id: action.id, text: action.text, done: false }];
    // TODO: 處理 "toggle" 和 "remove"
    default:
      return todos;
  }
}
