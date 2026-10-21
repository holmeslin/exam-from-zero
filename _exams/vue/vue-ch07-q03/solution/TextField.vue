<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const { label } = defineProps<{ label?: string }>()
const model = defineModel<string>()
</script>

<template>
  <label class="field">
    {{ label }}
    <input v-model="model" v-bind="$attrs" />
  </label>
</template>
