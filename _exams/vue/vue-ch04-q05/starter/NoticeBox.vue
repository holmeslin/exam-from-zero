<script setup lang="ts">
defineProps({
  title: String,
})
</script>

<template>
  <div class="notice-box">
    <h3>{{ title }}</h3>
    <!-- TODO：讓使用者放進來的內容出現在這裡；沒放東西時才顯示這句 -->
    <p>目前沒有公告。</p>
  </div>
</template>
