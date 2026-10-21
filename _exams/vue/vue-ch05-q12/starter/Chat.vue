<script setup lang="ts">
import { ref } from 'vue'

const messages = ref(['哈囉', '你好'])
const seen = ref(0)

async function handleSend() {
  messages.value.push('新訊息')
  // 想讀到「加入之後」畫面上有幾個 <li>
  seen.value = document.querySelectorAll('#messages li').length
}
</script>

<template>
  <ul id="messages">
    <li v-for="(message, index) in messages" :key="index">{{ message }}</li>
  </ul>
  <button @click="handleSend">送出一則</button>
  <p>畫面上有 {{ seen }} 則</p>
</template>
