<script setup lang="ts">
defineProps({
  stock: { type: Number, required: true },
})
</script>

<template>
  <!-- TODO：0 件「已售完」、少於 5 件「剩最後 N 件！」、其他「現貨供應中」 -->
  <p>現貨供應中</p>
</template>
