<script setup lang="ts" generic="T extends { id: number }">
const { items } = defineProps<{
  items: T[];
}>();

const emit = defineEmits<{
  select: [item: T];
}>();
</script>

<template>
  <ul>
    <li v-for="item in items" :key="item.id" @click="emit('select', item)">
      <slot :item="item" />
    </li>
  </ul>
</template>
