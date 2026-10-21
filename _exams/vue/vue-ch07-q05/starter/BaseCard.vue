<template>
  <section class="card">
    <header>
      <!-- TODO：放一個叫 header 的 slot，沒給時顯示「（沒有標題）」 -->
    </header>
    <div class="body">
      <slot />
    </div>
    <!-- TODO：有給 footer 時才畫出 <footer>，裡面放叫 footer 的 slot -->
  </section>
</template>
