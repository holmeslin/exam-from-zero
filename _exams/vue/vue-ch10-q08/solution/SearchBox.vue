<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from "vue";

const emit = defineEmits<{
  search: [text: string];
}>();

const input = useTemplateRef<HTMLInputElement>("search-input");
const text = ref("");

onMounted(() => {
  input.value?.focus();
});

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  text.value = target.value;
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === "Enter") {
    emit("search", text.value);
  }
}
</script>

<template>
  <input ref="search-input" @input="handleInput" @keydown="handleKeydown" />
  <p>{{ text }}</p>
</template>
