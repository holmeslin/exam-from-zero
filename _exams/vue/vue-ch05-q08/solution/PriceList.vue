<script setup lang="ts">
import { computed, ref } from 'vue'

const items = ref([
  { name: '鍵盤', price: 1200 },
  { name: '滑鼠', price: 300 },
  { name: '螢幕', price: 5000 },
])

const cheapFirst = computed(() => items.value.toSorted((x, y) => x.price - y.price))

const total = computed(() => items.value.reduce((sum, item) => sum + item.price, 0))
</script>

<template>
  <ol class="original">
    <li v-for="item in items" :key="item.name">{{ item.name }}</li>
  </ol>
  <ol class="sorted">
    <li v-for="item in cheapFirst" :key="item.name">{{ item.name }}</li>
  </ol>
  <p>總計 {{ total }} 元</p>
  <button @click="items.push({ name: '耳機', price: 800 })">加耳機</button>
</template>
