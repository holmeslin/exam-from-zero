<script setup lang="ts">
import { reactive } from 'vue'

function blank() {
  return { name: '', city: '' }
}

let form = reactive(blank())

function handleReset() {
  form = reactive(blank())
}
</script>

<template>
  <input class="name" v-model="form.name" />
  <input class="city" v-model="form.city" />
  <p>{{ form.name }} 住在 {{ form.city }}</p>
  <button @click="handleReset">清空</button>
</template>
