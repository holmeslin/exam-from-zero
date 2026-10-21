<script setup lang="ts">
// 伺服器上沒有 window，這一行會讓 SSR 出錯
const width = window.innerWidth;
</script>

<template>
  <p>視窗寬度：{{ width }}px</p>
</template>
