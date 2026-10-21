<script setup lang="ts">
defineProps({
  progress: { type: Number, required: true },
})
</script>

<template>
  <div class="bar" :class="{ done: progress >= 100 }">
    <div class="bar-fill" :style="{ width: progress + '%' }"></div>
  </div>
</template>
