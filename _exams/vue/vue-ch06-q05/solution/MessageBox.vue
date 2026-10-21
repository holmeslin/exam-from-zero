<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'

const message = ref('')
const messageInput = useTemplateRef<HTMLInputElement>('message-input')

onMounted(() => {
  messageInput.value?.focus()
})

function clear() {
  message.value = ''
  messageInput.value?.focus()
}
</script>

<template>
  <input ref="message-input" v-model="message" placeholder="留言" />
  <button @click="clear">清除</button>
</template>
