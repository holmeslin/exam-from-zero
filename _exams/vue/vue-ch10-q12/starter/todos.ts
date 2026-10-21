import { computed, ref } from "vue";
import { defineStore } from "pinia";

export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export const useTodoStore = defineStore("todos", () => {
  const todos = ref<Todo[]>([]);

  // TODO：還沒完成（done 為 false）的件數
  const remaining = computed(() => 0);

  // TODO：加入一筆新的待辦，id 不能和其他筆重複，done 是 false
  function addTodo(text: string) {
    throw new Error("TODO: addTodo");
  }

  // TODO：切換指定 id 的 done；找不到就什麼都不做
  function toggleTodo(id: number) {
    throw new Error("TODO: toggleTodo");
  }

  return { todos, remaining, addTodo, toggleTodo };
});
