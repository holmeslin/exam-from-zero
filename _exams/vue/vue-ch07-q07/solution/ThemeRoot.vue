<script setup lang="ts">
import { ref, provide } from 'vue'

const theme = ref('light')

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

provide('theme', { theme, toggleTheme })
</script>

<template>
  <p class="current">目前主題：{{ theme }}</p>
  <slot />
</template>
