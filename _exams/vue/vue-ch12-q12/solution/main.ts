// app.vue 裡 useHead 的 titleTemplate
function titleTemplate(title?: string): string {
  return title ? `${title}｜小書店` : '小書店'
}

console.log(titleTemplate('關於我們'))
console.log(titleTemplate(undefined))
console.log(titleTemplate('貓咪的程式課'))
console.log(titleTemplate(''))
