import type { Todo } from "./types.ts";

export function formatTodo(todo: Todo): string {
  const mark = todo.done ? "x" : " ";
  return `[${mark}] ${todo.id}. ${todo.title}`;
}
