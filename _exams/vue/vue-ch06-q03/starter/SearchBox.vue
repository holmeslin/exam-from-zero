<script setup lang="ts">
import { ref, watch } from 'vue'

const keyword = ref('')
const searched = ref('')
const count = ref(0)

watch(keyword, (newKeyword) => {
  // TODO：打下一個字之前，要先取消上一次排的計時器
  setTimeout(() => {
    searched.value = newKeyword
    count.value++
  }, 500)
})
</script>

<template>
  <input v-model="keyword" placeholder="輸入關鍵字" />
  <p class="searched">正在搜尋：{{ searched }}</p>
  <p class="count">已搜尋 {{ count }} 次</p>
</template>
