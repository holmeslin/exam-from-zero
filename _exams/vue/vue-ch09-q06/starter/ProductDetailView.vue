<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { products } from './products'

const route = useRoute()
const product = products.find((item) => item.id === Number(route.params.id))
// TODO: 讓 product 跟著網址變；並在 id 改變時（包含第一次進頁面）把 document.title 設成「商品 <id>」
</script>

<template>
  <div v-if="product">
    <h1>{{ product.name }}</h1>
    <p>售價 {{ product.price }} 元</p>
  </div>
  <p v-else>找不到這個商品</p>
  <RouterLink :to="`/products/${Number(route.params.id) + 1}`">下一個商品</RouterLink>
</template>
