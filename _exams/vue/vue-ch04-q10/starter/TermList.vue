<script setup lang="ts">
defineProps<{ terms: { id: number; word: string; meaning: string }[] }>()
</script>

<template>
  <dl>
    <div v-for="term in terms" :key="term.id">
      <dt>{{ term.word }}</dt>
      <dd>{{ term.meaning }}</dd>
    </div>
  </dl>
</template>
