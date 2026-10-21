import { formatTodo } from "./format";
import { Todo } from "./types.ts";

const todos: Todo[] = [
  { id: 1, title: "買牛奶", done: true },
  { id: 2, title: "繳電話費", done: false },
];

for (const todo of todos) {
  console.log(formatTodo(todo));
}

const latest = todos[todos.length];
console.log(`最新一筆：${latest.title}`);

const empty: Todo[] = [];
const none = empty[empty.length];
console.log(`空清單的最新一筆：${none.title}`);
