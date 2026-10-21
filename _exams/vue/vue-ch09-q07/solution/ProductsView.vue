<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { products } from './products'

const categories = ['all', 'keyboard', 'mouse']

const route = useRoute()
const category = computed(() => route.query.category ?? 'all')
const visible = computed(() =>
  category.value === 'all'
    ? products
    : products.filter((product) => product.category === category.value),
)
</script>

<template>
  <p>目前分類：{{ category }}</p>
  <p>
    <RouterLink
      v-for="name in categories"
      :key="name"
      :to="{ path: '/products', query: { ...route.query, category: name } }"
    >{{ name }}</RouterLink>
  </p>
  <ul>
    <li v-for="product in visible" :key="product.id">{{ product.name }}</li>
  </ul>
</template>
