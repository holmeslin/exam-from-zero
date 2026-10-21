<script setup lang="ts">
defineProps({
  progress: { type: Number, required: true },
})
</script>

<template>
  <!-- TODO：progress 達到 100 時，外框多一個 done class -->
  <div class="bar">
    <div class="bar-fill" :style="{ width: progress }"></div>
  </div>
</template>
