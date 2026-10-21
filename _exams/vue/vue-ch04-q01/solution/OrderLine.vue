<script setup lang="ts">
defineProps(['name', 'price', 'quantity'])
</script>

<template>
  <p class="name">商品：{{ name }}</p>
  <p class="subtotal">小計：{{ price * quantity }} 元</p>
</template>
