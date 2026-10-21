<script setup lang="ts">
// TODO：加上選填的 age（數字），沒傳時預設 18
const { name } = defineProps<{
  name: string;
}>();
</script>

<template>
  <p>{{ name }}</p>
</template>
