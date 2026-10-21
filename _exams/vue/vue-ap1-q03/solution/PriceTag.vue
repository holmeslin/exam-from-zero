<script setup lang="ts">
import { computed, ref } from "vue";

const props = withDefaults(defineProps<{ price?: number }>(), { price: 100 });

const quantity = ref(1);
const total = computed(() => quantity.value * props.price);

function add() {
  quantity.value++;
}
</script>

<template>
  <p>{{ quantity }} 本，共 {{ total }} 元</p>
  <button @click="add">多買一本</button>
</template>
