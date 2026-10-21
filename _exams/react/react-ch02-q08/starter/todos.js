// 三個函式都要「回傳新陣列」，不能改動傳進來的 todos 或裡面的物件。

export function addTodo(todos, todo) {
  todos.push(todo);
  return todos;
}

export function removeTodo(todos, id) {
  const index = todos.findIndex((todo) => todo.id === id);
  todos.splice(index, 1);
  return todos;
}

export function toggleTodo(todos, id) {
  const todo = todos.find((todo) => todo.id === id);
  todo.done = !todo.done;
  return todos;
}
