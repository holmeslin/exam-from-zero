<script setup lang="ts">
import { inject, ref } from "vue";
import { themeKey } from "./keys";

const theme = inject(themeKey, ref("light"));
</script>

<template>
  <p>目前是 {{ theme === 'light' ? '淺色' : '深色' }}</p>
</template>
