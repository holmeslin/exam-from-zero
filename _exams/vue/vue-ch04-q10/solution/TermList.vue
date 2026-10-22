<script setup lang="ts">
defineProps<{ terms: { id: number; word: string; meaning: string }[] }>()
</script>

<template>
  <dl>
    <template v-for="term in terms" :key="term.id">
      <dt>{{ term.word }}</dt>
      <dd>{{ term.meaning }}</dd>
    </template>
  </dl>
</template>
