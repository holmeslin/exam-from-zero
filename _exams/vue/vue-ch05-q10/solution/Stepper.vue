<script setup lang="ts">
defineProps<{ count: number }>()
const emit = defineEmits(['change'])
</script>

<template>
  <button class="minus" @click="emit('change', -1)">-</button>
  <span>{{ count }}</span>
  <button class="plus" @click="emit('change', 1)">+</button>
</template>
