<script setup lang="ts">
import type { Directive } from "vue";

const vFocus: Directive<HTMLInputElement> = {
  // TODO：元素放到畫面上之後，讓它取得焦點
};
</script>

<template>
  <input v-focus placeholder="搜尋書名" />
</template>
