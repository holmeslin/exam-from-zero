<script setup lang="ts">
import { computed, reactive } from "vue";

type SignupForm = {
  email: string;
  age: number | null;
  agree: boolean;
};

const form: SignupForm = reactive({
  email: "",
  age: null,
  agree: false,
});

// TODO：email 含有 @、age 不是 null、agree 為 true 時才是 true
const canSubmit = computed(() => {
  return true;
});
</script>

<template>
  <input v-model="form.email" class="email" type="email" />
  <input v-model.number="form.age" class="age" type="number" />
  <label><input v-model="form.agree" class="agree" type="checkbox" /> 同意</label>
  <button :disabled="!canSubmit">送出</button>
</template>
