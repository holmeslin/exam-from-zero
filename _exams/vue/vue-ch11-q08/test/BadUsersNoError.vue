<script setup lang="ts">
import { onMounted, ref } from "vue";
const props = defineProps<{ loadUsers: () => Promise<string[]> }>();
const users = ref<string[] | null>(null);
onMounted(async () => {
  try {
    users.value = await props.loadUsers();
  } catch {
    // 忘了顯示錯誤訊息
  }
});
</script>

<template>
  <p v-if="users === null">載入中…</p>
  <ul v-else>
    <li v-for="user in users" :key="user">{{ user }}</li>
  </ul>
</template>
