<script setup lang="ts">
// TODO：用解構拿出 label 和 size，size 沒給時預設為 "md"
const props = defineProps<{ label?: string; size?: string }>()
</script>

<template>
  <button :class="props.size">{{ props.label }}（{{ props.size }}）</button>
</template>
