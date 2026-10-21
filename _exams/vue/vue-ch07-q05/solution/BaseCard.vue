<template>
  <section class="card">
    <header>
      <slot name="header">（沒有標題）</slot>
    </header>
    <div class="body">
      <slot />
    </div>
    <footer v-if="$slots.footer">
      <slot name="footer" />
    </footer>
  </section>
</template>
