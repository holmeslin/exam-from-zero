<script setup lang="ts">
import { ref, provide } from 'vue'

const theme = ref('light')

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

// 底下的元件會用 inject('theme') 拿到 { theme, toggleTheme }
provide('theme', { theme: theme.value, toggleTheme })
</script>

<template>
  <p class="current">目前主題：{{ theme }}</p>
  <slot />
</template>
