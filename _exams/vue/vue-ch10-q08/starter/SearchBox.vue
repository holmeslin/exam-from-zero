<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from "vue";

const emit = defineEmits<{
  search: [text: string];
}>();

const input = useTemplateRef<HTMLInputElement>("search-input");
const text = ref("");

onMounted(() => {
  // TODO：讓輸入框取得焦點（input.value 可能是 null）
});

function handleInput(event: Event) {
  // TODO：用 as 取得 <input>，把它的 value 放進 text
}

function handleKeydown(event: KeyboardEvent) {
  // TODO：按下 Enter 時發出 search 事件，帶目前的 text
}
</script>

<template>
  <input ref="search-input" @input="handleInput" @keydown="handleKeydown" />
  <p>{{ text }}</p>
</template>
