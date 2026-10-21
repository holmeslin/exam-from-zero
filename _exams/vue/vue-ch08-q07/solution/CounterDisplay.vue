<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCounterStore } from "./counter";

const counter = useCounterStore();
const { count, doubleCount } = storeToRefs(counter);
const { increment } = counter;
</script>

<template>
  <p>目前是 {{ count }}，兩倍是 {{ doubleCount }}</p>
  <button @click="increment">加一</button>
</template>
