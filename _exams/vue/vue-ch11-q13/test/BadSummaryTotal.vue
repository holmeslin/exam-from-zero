<script setup lang="ts">
import { useCartStore } from "./cart";
const cart = useCartStore();
</script>

<template>
  <p data-test="count">購物車裡有 {{ cart.count }} 件商品</p>
  <p data-test="total">合計 NT$ {{ cart.total }}</p>
  <button @click="cart.clear()">清空</button>
</template>
