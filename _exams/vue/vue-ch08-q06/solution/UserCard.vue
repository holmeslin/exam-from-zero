<script setup lang="ts">
import { useUserStore } from "./user";

const user = useUserStore();
</script>

<template>
  <p>{{ user.name }} 有 {{ user.points }} 點</p>
  <button @click="user.addPoints(10)">加 10 點</button>
</template>
