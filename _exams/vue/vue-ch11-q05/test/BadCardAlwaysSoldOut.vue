<script setup lang="ts">
import { formatPrice } from "./price";
defineProps<{ name: string; price: number; soldOut?: boolean }>();
</script>

<template>
  <article class="card">
    <h2>{{ name }}</h2>
    <p class="price">{{ formatPrice(price) }}</p>
    <p class="sold-out">已售完</p>
  </article>
</template>
