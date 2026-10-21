<script setup lang="ts">
import { onMounted, ref } from "vue";
const props = defineProps<{ loadUsers: () => Promise<string[]> }>();
const users = ref<string[] | null>(null);
const error = ref("");
onMounted(async () => {
  try {
    await props.loadUsers();
    users.value = await props.loadUsers();
  } catch {
    error.value = "載入失敗";
  }
});
</script>

<template>
  <p v-if="error">{{ error }}</p>
  <p v-else-if="users === null">載入中…</p>
  <ul v-else>
    <li v-for="user in users" :key="user">{{ user }}</li>
  </ul>
</template>
