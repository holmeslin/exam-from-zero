<script setup lang="ts">
const { label, size = 'md' } = defineProps<{ label?: string; size?: string }>()
</script>

<template>
  <button :class="size">{{ label }}（{{ size }}）</button>
</template>
