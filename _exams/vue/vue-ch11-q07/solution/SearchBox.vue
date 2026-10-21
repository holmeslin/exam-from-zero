<script setup lang="ts">
import { ref } from "vue";

defineProps<{ placeholder: string }>();
const emit = defineEmits<{ search: [keyword: string] }>();

const keyword = ref("");

function submit() {
  const text = keyword.value.trim();
  if (text === "") {
    return;
  }
  emit("search", text);
}
</script>

<template>
  <form @submit.prevent="submit">
    <input v-model="keyword" :placeholder="placeholder" />
    <button>搜尋</button>
  </form>
</template>
