<script setup lang="ts">
const props = defineProps<{ count: number }>()

function handleMinus() {
  // 這樣改不了：props 是唯讀的
  props.count--
}

function handlePlus() {
  props.count++
}
</script>

<template>
  <button class="minus" @click="handleMinus">-</button>
  <span>{{ count }}</span>
  <button class="plus" @click="handlePlus">+</button>
</template>
