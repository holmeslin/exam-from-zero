<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <h1>找不到這個頁面</h1>
  <p>網址 {{ route.fullPath }} 不存在。</p>
</template>
