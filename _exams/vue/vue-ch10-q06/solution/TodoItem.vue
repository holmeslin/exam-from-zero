<script setup lang="ts">
const { id, text } = defineProps<{
  id: number;
  text: string;
}>();

const emit = defineEmits<{
  remove: [id: number];
  rename: [id: number, text: string];
}>();
</script>

<template>
  <li>
    {{ text }}
    <button class="rename" @click="emit('rename', id, text + '！')">加驚嘆號</button>
    <button class="remove" @click="emit('remove', id)">刪除</button>
  </li>
</template>
