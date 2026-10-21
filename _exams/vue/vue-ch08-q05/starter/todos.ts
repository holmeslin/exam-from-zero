import { ref, computed } from "vue";
import { defineStore } from "pinia";

type Todo = { id: number; text: string; done: boolean };

export const useTodoStore = defineStore("todos", () => {
  const todos = ref<Todo[]>([
    { id: 1, text: "買牛奶", done: true },
    { id: 2, text: "寫作業", done: false },
  ]);

  const doneCount = computed(() => {
    // TODO: 算出已完成的項目數
    return 0;
  });

  function addTodo(text: string) {
    // TODO: 加入一個新的待辦，id 用長度加一，done 為 false
  }

  function toggleTodo(id: number) {
    // TODO: 切換指定 id 的 done
  }

  return { todos, doneCount, addTodo, toggleTodo };
});
