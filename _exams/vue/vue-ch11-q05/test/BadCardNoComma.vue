<script setup lang="ts">
defineProps<{ name: string; price: number; soldOut?: boolean }>();
</script>

<template>
  <article class="card">
    <h2>{{ name }}</h2>
    <p class="price">NT$ {{ price }}</p>
    <p v-if="soldOut" class="sold-out">已售完</p>
  </article>
</template>
