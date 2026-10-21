<script setup lang="ts">
import { ref } from 'vue'

const todos = ref([
  { id: 1, title: '買牛奶', done: true },
  { id: 2, title: '寫作業', done: false },
  { id: 3, title: '倒垃圾', done: false },
])

// 另外存一份：一開始算一次，之後就不會變了
const remaining = ref(todos.value.filter((todo) => !todo.done).length)
const hasDone = ref(true)

function handleClearDone() {
  // TODO：刪掉所有已完成的事項
}
</script>

<template>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      <label><input type="checkbox" v-model="todo.done" /> {{ todo.title }}</label>
    </li>
  </ul>
  <p>還有 {{ remaining }} 項未完成</p>
  <button v-if="hasDone" @click="handleClearDone">清除已完成</button>
</template>
