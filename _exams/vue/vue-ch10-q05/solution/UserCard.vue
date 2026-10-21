<script setup lang="ts">
const { name, age = 18 } = defineProps<{
  name: string;
  age?: number;
}>();
</script>

<template>
  <p>{{ name }}，{{ age }} 歲</p>
</template>
