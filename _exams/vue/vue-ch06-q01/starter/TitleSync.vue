<script setup lang="ts">
import { ref, watch } from 'vue'

const title = ref('我的筆記')

// 頁面一載入，分頁標題就要是「我的筆記」，之後跟著輸入框改變
watch(title, (newTitle) => {
  document.title = newTitle
})
</script>

<template>
  <input v-model="title" />
</template>
