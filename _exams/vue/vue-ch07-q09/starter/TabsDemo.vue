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

  <!-- TODO：筆記分頁切走再切回來要保留內容，計數器則每次歸零 -->
  <component :is="tabs[current]" />
</template>
