<script setup lang="ts">
import { computed, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { products } from './products'

const route = useRoute()
const product = computed(() => products.find((item) => item.id === Number(route.params.id)))

watch(
  () => route.params.id,
  (id) => {
    document.title = `商品 ${id}`
  },
  { immediate: true },
)
</script>

<template>
  <div v-if="product">
    <h1>{{ product.name }}</h1>
    <p>售價 {{ product.price }} 元</p>
  </div>
  <p v-else>找不到這個商品</p>
  <RouterLink :to="`/products/${Number(route.params.id) + 1}`">下一個商品</RouterLink>
</template>
