<script setup lang="ts">
import { ref } from 'vue'

const text = ref('')
</script>

<template>
  <textarea v-model="text" placeholder="寫點什麼…"></textarea>
</template>
