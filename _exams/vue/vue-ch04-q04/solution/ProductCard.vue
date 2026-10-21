<script setup lang="ts">
defineProps({
  name: { type: String, required: true },
  price: { type: Number, default: 0 },
  isNew: Boolean,
})
</script>

<template>
  <div>
    <h2>{{ name }}{{ isNew ? '（新品）' : '' }}</h2>
    <p>{{ price }} 元</p>
  </div>
</template>
