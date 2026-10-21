<script setup lang="ts">
import { ref } from 'vue'

const sent = ref(0)

function handleSubmit() {
  // TODO：送出一次，sent 加一
}
</script>

<template>
  <form>
    <textarea></textarea>
    <button type="submit">送出</button>
  </form>
  <p>已送出 {{ sent }} 次</p>
</template>
