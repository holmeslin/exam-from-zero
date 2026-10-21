<script>
export default {
  props: {
    step: { type: Number, default: 1 },
  },
  emits: ["reached"],
  data() {
    return {
      count: 0,
      history: [],
    };
  },
  watch: {
    // TODO：監聽 count，把「舊值→新值」加進 history；新值 >= 10 時發出 reached 事件
  },
  methods: {
    increment() {
      this.count += this.step;
    },
  },
};
</script>

<template>
  <button @click="increment">{{ count }}</button>
  <p>{{ history.join('、') }}</p>
</template>
