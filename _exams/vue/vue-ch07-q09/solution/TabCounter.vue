<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button class="count" @click="count++">按了 {{ count }} 次</button>
</template>
