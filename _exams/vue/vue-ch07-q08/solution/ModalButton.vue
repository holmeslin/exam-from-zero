<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <button class="open" @click="open = true">打開對話框</button>

  <Teleport to="body">
    <div v-if="open" class="modal">
      <p>我是對話框</p>
      <button class="close" @click="open = false">關閉</button>
    </div>
  </Teleport>
</template>
