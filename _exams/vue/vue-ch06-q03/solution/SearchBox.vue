<script setup lang="ts">
import { onWatcherCleanup, ref, watch } from 'vue'

const keyword = ref('')
const searched = ref('')
const count = ref(0)

watch(keyword, (newKeyword) => {
  const timer = setTimeout(() => {
    searched.value = newKeyword
    count.value++
  }, 500)

  onWatcherCleanup(() => {
    clearTimeout(timer)
  })
})
</script>

<template>
  <input v-model="keyword" placeholder="輸入關鍵字" />
  <p class="searched">正在搜尋：{{ searched }}</p>
  <p class="count">已搜尋 {{ count }} 次</p>
</template>
