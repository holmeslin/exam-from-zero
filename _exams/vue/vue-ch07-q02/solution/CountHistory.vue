<script setup lang="ts">
import { useHistory } from './useHistory'

const { count } = defineProps<{ count: number }>()

const history = useHistory(() => count)
</script>

<template>
  <p>目前是 {{ count }}</p>
  <p class="history">{{ history.join(',') }}</p>
</template>
