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
  todos.splice(index, 1);
  // TODO：資料刪掉了，畫面還沒跟上
}

document.querySelector("#add").addEventListener("click", () => {
  addTodo("寫作業");
});

document.querySelector("#remove").addEventListener("click", () => {
  removeTodo(0);
});
