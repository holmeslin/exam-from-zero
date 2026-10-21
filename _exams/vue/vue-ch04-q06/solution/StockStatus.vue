<script setup lang="ts">
defineProps({
  stock: { type: Number, required: true },
})
</script>

<template>
  <p v-if="stock === 0">已售完</p>
  <p v-else-if="stock < 5">剩最後 {{ stock }} 件！</p>
  <p v-else>現貨供應中</p>
</template>
