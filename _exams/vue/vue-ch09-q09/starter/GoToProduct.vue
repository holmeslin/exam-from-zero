<script setup lang="ts">
import { ref } from 'vue'

const productId = ref('')

function goToProduct() {
  // TODO: 換頁到 /products/<輸入的編號>；沒輸入時什麼都不做
}
</script>

<template>
  <form @submit.prevent="goToProduct">
    <input v-model="productId" placeholder="輸入商品編號" />
    <button>前往</button>
  </form>
</template>
