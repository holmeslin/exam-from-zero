import { ref, computed } from "vue";
import { defineStore } from "pinia";

type Todo = { id: number; text: string; done: boolean };

export const useTodoStore = defineStore("todos", () => {
  const todos = ref<Todo[]>([
    { id: 1, text: "買牛奶", done: true },
    { id: 2, text: "寫作業", done: false },
  ]);

  const doneCount = computed(() => {
    return todos.value.filter((todo) => todo.done).length;
  });

  function addTodo(text: string) {
    todos.value.push({ id: todos.value.length + 1, text, done: false });
  }

  function toggleTodo(id: number) {
    const todo = todos.value.find((todo) => todo.id === id);
    if (todo) todo.done = !todo.done;
  }

  return { todos, doneCount, addTodo, toggleTodo };
});
