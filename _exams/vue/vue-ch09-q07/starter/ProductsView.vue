<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { products } from './products'

const categories = ['all', 'keyboard', 'mouse']

const route = useRoute()
// TODO: 改成從 route.query.category 算出來，沒有時是 'all'
const category = computed(() => 'all')
const visible = computed(() =>
  category.value === 'all'
    ? products
    : products.filter((product) => product.category === category.value),
)
</script>

<template>
  <p>目前分類：{{ category }}</p>
  <p>
    <!-- TODO: 換分類時要保留其他查詢參數 -->
    <RouterLink
      v-for="name in categories"
      :key="name"
      :to="{ path: '/products', query: { category: name } }"
    >{{ name }}</RouterLink>
  </p>
  <ul>
    <li v-for="product in visible" :key="product.id">{{ product.name }}</li>
  </ul>
</template>
