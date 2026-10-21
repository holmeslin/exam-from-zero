<script setup lang="ts">
defineProps(['id', 'name', 'isSoldOut'])
</script>

<template>
  <a :href="'/products/' + id" :title="`查看 ${name}`">{{ name }}</a>
  <button :disabled="isSoldOut">加入購物車</button>
</template>
