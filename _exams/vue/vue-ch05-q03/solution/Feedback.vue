<script setup lang="ts">
import { ref } from 'vue'

const sent = ref(0)

function handleSubmit() {
  sent.value++
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <textarea></textarea>
    <button type="submit">送出</button>
  </form>
  <p>已送出 {{ sent }} 次</p>
</template>
