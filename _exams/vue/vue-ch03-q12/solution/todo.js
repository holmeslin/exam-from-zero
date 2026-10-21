// 檔案：todo.js
const list = document.querySelector("#list");
const summary = document.querySelector("#summary");
const emptyMessage = document.querySelector("#empty");
const todos = [];

export function addTodo(text) {
  todos.push(text);

  const li = document.createElement("li");
  li.textContent = text;
  list.appendChild(li);

  summary.textContent = `共 ${todos.length} 項`;
  emptyMessage.hidden = true;
}

export function removeTodo(index) {
  if (index >= todos.length) {
    return; // 沒有這一項，什麼都不做
  }
  todos.splice(index, 1);

  list.children[index].remove();

  summary.textContent = `共 ${todos.length} 項`;
  if (todos.length === 0) {
    emptyMessage.hidden = false;
  }
}

document.querySelector("#add").addEventListener("click", () => {
  addTodo("寫作業");
});

document.querySelector("#remove").addEventListener("click", () => {
  removeTodo(0);
});
