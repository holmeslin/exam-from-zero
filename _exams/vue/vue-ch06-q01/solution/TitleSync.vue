<script setup lang="ts">
import { ref, watch } from 'vue'

const title = ref('我的筆記')

watch(
  title,
  (newTitle) => {
    document.title = newTitle
  },
  { immediate: true },
)
</script>

<template>
  <input v-model="title" />
</template>
