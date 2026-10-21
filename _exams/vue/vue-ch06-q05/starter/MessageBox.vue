<script setup lang="ts">
import { ref } from 'vue'

const message = ref('')

// TODO：一掛載就讓輸入框取得游標

function clear() {
  message.value = ''
  // TODO：清除後讓游標回到輸入框
}
</script>

<template>
  <input v-model="message" placeholder="留言" />
  <button @click="clear">清除</button>
</template>
