<script setup lang="ts">
import { ref } from "vue";
const name = ref("");
const agreed = ref(false);
</script>

<template>
  <input v-model="name" type="text" />
  <label><input v-model="agreed" type="checkbox" /> 我同意</label>
  <p v-if="name">哈囉，{{ name }}！</p>
  <button>送出</button>
</template>
