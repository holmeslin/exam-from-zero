<script setup lang="ts">
import { ref } from 'vue'
import TabCounter from './TabCounter.vue'
import TabNotes from './TabNotes.vue'

const tabs = { counter: TabCounter, notes: TabNotes }
const current = ref<'counter' | 'notes'>('counter')
</script>

<template>
  <button class="to-counter" @click="current = 'counter'">計數器</button>
  <button class="to-notes" @click="current = 'notes'">筆記</button>

  <KeepAlive include="TabNotes">
    <component :is="tabs[current]" />
  </KeepAlive>
</template>
