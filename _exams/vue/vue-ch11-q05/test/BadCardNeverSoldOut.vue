<script setup lang="ts">
import { formatPrice } from "./price";
defineProps<{ name: string; price: number; soldOut?: boolean }>();
</script>

<template>
  <article class="card">
    <h2>{{ name }}</h2>
    <p class="price">{{ formatPrice(price) }}</p>
  </article>
</template>
