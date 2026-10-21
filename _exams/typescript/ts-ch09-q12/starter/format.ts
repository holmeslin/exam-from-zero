import type { Todo } from "./types.ts";

function formatTodo(todo: Todo): string {
  const mark = todo.done ? "x" : " ";
  return `[${mark}] ${todo.id}. ${todo.title}`;
}
