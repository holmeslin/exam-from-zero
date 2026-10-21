import { computed, ref } from "vue";
import { defineStore } from "pinia";

export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export const useTodoStore = defineStore("todos", () => {
  const todos = ref<Todo[]>([]);

  const remaining = computed(() => {
    return todos.value.filter((todo) => !todo.done).length;
  });

  function addTodo(text: string) {
    todos.value.push({ id: Date.now() + todos.value.length, text, done: false });
  }

  function toggleTodo(id: number) {
    const todo = todos.value.find((todo) => todo.id === id);
    if (todo) {
      todo.done = !todo.done;
    }
  }

  return { todos, remaining, addTodo, toggleTodo };
});
