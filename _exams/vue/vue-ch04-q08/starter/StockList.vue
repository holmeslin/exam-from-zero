<script setup lang="ts">
const props = defineProps({
  products: { type: Array, required: true },
})

// TODO：只留下 inStock 為 true 的商品
const available: any[] = []
</script>

<template>
  <h2>現貨商品（{{ available.length }} 項）</h2>
  <!-- TODO：沒有現貨時顯示「目前沒有現貨。」，不然用 v-for 列出每項商品名稱 -->
  <ul></ul>
</template>
