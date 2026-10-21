<script setup lang="ts">
defineProps({
  open: Boolean,
})
</script>

<template>
  <nav v-if="open" class="menu">
    <a href="/">首頁</a>
    <a href="/products">商品</a>
  </nav>
</template>
