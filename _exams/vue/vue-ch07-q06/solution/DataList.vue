<script setup lang="ts">
const { items } = defineProps<{ items: { id: number; name: string }[] }>()
</script>

<template>
  <ol v-if="items.length > 0">
    <li v-for="(item, index) in items" :key="item.id">
      <slot name="item" :item="item" :index="index" />
    </li>
  </ol>
  <p v-else>
    <slot name="empty">沒有資料</slot>
  </p>
</template>
