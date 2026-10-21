<script setup lang="ts">
defineProps({
  title: String,
})
</script>

<template>
  <div class="notice-box">
    <h3>{{ title }}</h3>
    <slot><p>目前沒有公告。</p></slot>
  </div>
</template>
