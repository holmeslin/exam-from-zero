<script setup lang="ts">
const { items } = defineProps<{ items: { id: number; name: string }[] }>()
</script>

<template>
  <ol v-if="items.length > 0">
    <li v-for="item in items" :key="item.id">
      <!-- TODO：改成叫 item 的 slot，並把 item 和 index 交給父元件 -->
      {{ item.name }}
    </li>
  </ol>
  <p v-else>
    <!-- TODO：叫 empty 的 slot，沒給時顯示「沒有資料」 -->
  </p>
</template>
