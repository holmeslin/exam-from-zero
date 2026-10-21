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
    count(newValue, oldValue) {
      this.history.push(`${oldValue}→${newValue}`);
      if (newValue >= 10) {
        this.$emit("reached", newValue);
      }
    },
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
