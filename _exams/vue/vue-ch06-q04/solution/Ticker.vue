<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const seconds = ref(0)
let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  timer = setInterval(() => {
    seconds.value++
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <p>已經過 {{ seconds }} 秒</p>
</template>
