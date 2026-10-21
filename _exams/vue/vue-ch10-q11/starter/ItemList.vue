<script setup lang="ts">
// TODO：在 <script setup> 加上 generic="T extends { id: number }"，
// props 的 items 改成 T[]，並宣告 select 事件與作用域 slot
const { items } = defineProps<{
  items: { id: number }[];
}>();
</script>

<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.id }}
    </li>
  </ul>
</template>
