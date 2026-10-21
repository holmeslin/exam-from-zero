import { beforeEach, expect, test } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useTodoStore } from "./todos";

beforeEach(() => {
  setActivePinia(createPinia());
});

test("doneCount 一開始是 1", () => {
  expect(useTodoStore().doneCount).toBe(1);
});

test("toggleTodo 切換完成狀態，doneCount 跟著變", () => {
  const store = useTodoStore();
  store.toggleTodo(2);
  expect(store.todos[1].done).toBe(true);
  expect(store.doneCount).toBe(2);
  store.toggleTodo(1);
  expect(store.todos[0].done).toBe(false);
  expect(store.doneCount).toBe(1);
});

test("addTodo 新增一個未完成的待辦", () => {
  const store = useTodoStore();
  store.addTodo("倒垃圾");
  expect(store.todos.length).toBe(3);
  expect(store.todos[2]).toEqual({ id: 3, text: "倒垃圾", done: false });
  expect(store.doneCount).toBe(1);
});
