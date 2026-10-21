<script setup lang="ts">
let count = 0

function handleAdd() {
  count++
}
</script>

<template>
  <p>目前：{{ count }}</p>
  <button @click="handleAdd">加一</button>
</template>
