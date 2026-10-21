<script>
export default {
  data() {
    return { count: 0 };
  },
  methods: {
    increment: () => {
      this.count++;
    },
  },
};
</script>

<template>
  <button @click="increment">點了 {{ count }} 次</button>
</template>
