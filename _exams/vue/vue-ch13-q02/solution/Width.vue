<script setup lang="ts">
import { onMounted, ref } from "vue";

const width = ref(0);

onMounted(() => {
  width.value = window.innerWidth;
});
</script>

<template>
  <p>視窗寬度：{{ width }}px</p>
</template>
