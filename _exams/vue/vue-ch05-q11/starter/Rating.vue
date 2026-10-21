<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{ modelValue: number }>()

// 這只是複製一份，改它不會通知父元件
const stars = ref(props.modelValue)
</script>

<template>
  <button v-for="n in 5" :key="n" @click="stars = n">{{ n <= stars ? '★' : '☆' }}</button>
</template>
