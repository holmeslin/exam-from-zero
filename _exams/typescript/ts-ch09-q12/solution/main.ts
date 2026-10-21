import { formatTodo } from "./format.ts";
import type { Todo } from "./types.ts";

const todos: Todo[] = [
  { id: 1, title: "買牛奶", done: true },
  { id: 2, title: "繳電話費", done: false },
];

for (const todo of todos) {
  console.log(formatTodo(todo));
}

const latest = todos[todos.length - 1];
if (latest !== undefined) {
  console.log(`最新一筆：${latest.title}`);
}

const empty: Todo[] = [];
const none = empty[empty.length - 1];
if (none !== undefined) {
  console.log(`空清單的最新一筆：${none.title}`);
}
