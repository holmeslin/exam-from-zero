<script setup lang="ts">
const props = defineProps({
  products: { type: Array, required: true },
})

const available = (props.products as any[]).filter((product) => product.inStock)
</script>

<template>
  <h2>現貨商品（{{ available.length }} 項）</h2>
  <p v-if="available.length === 0">目前沒有現貨。</p>
  <ul v-else>
    <li v-for="product in available" :key="product.id">{{ product.name }}</li>
  </ul>
</template>
