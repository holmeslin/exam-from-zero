<script setup lang="ts">
const { label } = defineProps<{ label?: string }>()
const model = defineModel<string>()
</script>

<template>
  <label class="field">
    {{ label }}
    <input v-model="model" />
  </label>
</template>
