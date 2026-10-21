<script setup lang="ts">
import type { Directive } from "vue";

const vFocus: Directive<HTMLInputElement> = {
  mounted(el) {
    el.focus();
  },
};
</script>

<template>
  <input v-focus placeholder="搜尋書名" />
</template>
