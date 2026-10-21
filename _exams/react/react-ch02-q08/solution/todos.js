export function addTodo(todos, todo) {
  return [...todos, todo];
}

export function removeTodo(todos, id) {
  return todos.filter((todo) => todo.id !== id);
}

export function toggleTodo(todos, id) {
  return todos.map((todo) =>
    todo.id === id ? { ...todo, done: !todo.done } : todo
  );
}
