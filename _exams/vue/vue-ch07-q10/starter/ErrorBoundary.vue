<script setup lang="ts">
import { ref } from 'vue'

const error = ref<Error | null>(null)

// TODO：底下的元件出錯時，把錯誤存進 error，並且不要再往上傳
</script>

<template>
  <div v-if="error" class="fallback">
    <p>這一塊出錯了：{{ error.message }}</p>
    <button class="retry" @click="error = null">再試一次</button>
  </div>
  <slot v-else />
</template>
