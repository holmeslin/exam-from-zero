<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)

function handleAdd() {
  count.value++
}
</script>

<template>
  <p>目前：{{ count }}</p>
  <button @click="handleAdd">加一</button>
</template>
