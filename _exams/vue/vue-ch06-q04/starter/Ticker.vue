<script setup lang="ts">
import { onMounted, ref } from 'vue'

const seconds = ref(0)

onMounted(() => {
  // TODO：每 1000 毫秒讓 seconds 加 1
})

// TODO：元件卸載時把計時器停掉
</script>

<template>
  <p>已經過 {{ seconds }} 秒</p>
</template>
