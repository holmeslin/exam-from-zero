<script setup lang="ts">
defineProps(['name', 'price', 'quantity'])
</script>

<template>
  <p class="name">商品：{{ name }}</p>
  <!-- TODO：顯示「小計：單價 × 數量 元」 -->
  <p class="subtotal">小計： 元</p>
</template>
