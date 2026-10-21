<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const productId = ref('')

function goToProduct() {
  if (productId.value === '') return
  router.push({ name: 'product', params: { id: productId.value } })
}
</script>

<template>
  <form @submit.prevent="goToProduct">
    <input v-model="productId" placeholder="輸入商品編號" />
    <button>前往</button>
  </form>
</template>
