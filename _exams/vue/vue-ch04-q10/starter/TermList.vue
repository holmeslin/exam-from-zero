<script setup lang="ts">
defineProps({
  terms: { type: Array, required: true },
})
</script>

<template>
  <dl>
    <div v-for="term in terms" :key="term.id">
      <dt>{{ term.word }}</dt>
      <dd>{{ term.meaning }}</dd>
    </div>
  </dl>
</template>
