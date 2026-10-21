<script setup lang="ts">
import { inject } from "vue";

// TODO：改用 keys.ts 的 themeKey，並給預設值 ref("light")
const theme = inject("theme");
</script>

<template>
  <p>目前是 {{ theme === 'light' ? '淺色' : '深色' }}</p>
</template>
