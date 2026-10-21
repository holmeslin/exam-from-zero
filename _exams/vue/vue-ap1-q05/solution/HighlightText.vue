<script setup lang="ts">
import type { Directive } from "vue";

defineProps<{ color: string }>();

const vHighlight: Directive<HTMLElement, string, "bold"> = (el, binding) => {
  el.style.backgroundColor = binding.value;
  el.style.fontWeight = binding.modifiers.bold ? "bold" : "normal";
};
</script>

<template>
  <p v-highlight="color">一般的螢光筆</p>
  <p v-highlight.bold="color">加粗的螢光筆</p>
</template>
