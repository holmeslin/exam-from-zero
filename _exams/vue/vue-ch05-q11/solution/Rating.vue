<script setup lang="ts">
const stars = defineModel<number>()
</script>

<template>
  <button v-for="n in 5" :key="n" @click="stars = n">{{ n <= (stars ?? 0) ? '★' : '☆' }}</button>
</template>
