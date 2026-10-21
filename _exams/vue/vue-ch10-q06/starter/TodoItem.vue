<script setup lang="ts">
const { id, text } = defineProps<{
  id: number;
  text: string;
}>();

// TODO：用 defineEmits<{ ... }>() 宣告 remove 與 rename 兩個事件
</script>

<template>
  <li>
    {{ text }}
    <button class="rename">加驚嘆號</button>
    <button class="remove">刪除</button>
  </li>
</template>
