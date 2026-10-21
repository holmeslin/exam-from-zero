<script setup lang="ts">
import { ref } from 'vue'

const a = ref(0)
const b = ref(0)
</script>

<template>
  <input class="a" v-model="a" /> +
  <input class="b" v-model="b" />
  <p>= {{ a + b }}</p>
</template>
