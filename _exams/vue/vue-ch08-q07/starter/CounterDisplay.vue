<script setup lang="ts">
import { useCounterStore } from "./counter";

const { count, doubleCount, increment } = useCounterStore();
</script>

<template>
  <p>目前是 {{ count }}，兩倍是 {{ doubleCount }}</p>
  <button @click="increment">加一</button>
</template>
