<script setup lang="ts">
import { useRoute } from 'vue-router'
import { products } from './products'

const route = useRoute()
const product = products.find((item) => item.id === Number(route.params.id))
</script>

<template>
  <div v-if="product">
    <h1>{{ product.name }}</h1>
    <p>售價 {{ product.price }} 元</p>
  </div>
  <p v-else>找不到這個商品</p>
</template>
