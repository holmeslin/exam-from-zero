<script setup lang="ts">
import { ref } from "vue";
defineProps<{ placeholder: string }>();
const emit = defineEmits<{ search: [keyword: string] }>();
const keyword = ref("");
function submit() {
  emit("search", keyword.value.trim());
}
</script>

<template>
  <form @submit.prevent="submit">
    <input v-model="keyword" :placeholder="placeholder" />
    <button>搜尋</button>
  </form>
</template>
