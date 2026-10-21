<script setup lang="ts">
import { ref, watch } from 'vue'

const userId = ref(1)
const user = ref<{ name: string } | null>(null)
const loading = ref(false)
const error = ref('')

watch(
  userId,
  async (id) => {
    // TODO：先發出、晚回來的過期請求，不可以蓋掉新的結果
    loading.value = true
    error.value = ''
    user.value = null

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      if (!response.ok) {
        throw new Error(`伺服器回應失敗：${response.status}`)
      }
      user.value = await response.json()
    } catch (e) {
      error.value = (e as Error).message
    }

    loading.value = false
  },
  { immediate: true },
)
</script>

<template>
  <button v-for="id in [1, 2, 999]" :key="id" @click="userId = id">{{ id }} 號</button>
  <p v-if="loading" class="status">載入中……</p>
  <p v-else-if="error" class="status">出錯了：{{ error }}</p>
  <p v-else-if="user" class="status">{{ user.name }}</p>
</template>
