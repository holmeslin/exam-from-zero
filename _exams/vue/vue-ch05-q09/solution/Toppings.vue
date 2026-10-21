<script setup lang="ts">
import { ref } from 'vue'

const TOPPINGS = ['起司', '培根', '洋蔥']

const selected = ref<string[]>([])
</script>

<template>
  <label v-for="topping in TOPPINGS" :key="topping">
    <input type="checkbox" v-model="selected" :value="topping" />
    {{ topping }}
  </label>
  <p>已選：{{ selected.join('、') }}</p>
</template>
