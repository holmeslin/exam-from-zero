<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'

const error = ref<Error | null>(null)

onErrorCaptured((err) => {
  error.value = err as Error
  return false
})
</script>

<template>
  <div v-if="error" class="fallback">
    <p>這一塊出錯了：{{ error.message }}</p>
    <button class="retry" @click="error = null">再試一次</button>
  </div>
  <slot v-else />
</template>
