<script setup lang="ts">
// TODO：改成物件寫法，name 必填、price 預設 0、isNew 是布林值
defineProps(['name', 'price', 'isNew'])
</script>

<template>
  <div>
    <h2>{{ name }}{{ isNew ? '（新品）' : '' }}</h2>
    <p>{{ price }} 元</p>
  </div>
</template>
