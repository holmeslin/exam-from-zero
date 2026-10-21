// app.vue 裡 useHead 的 titleTemplate
function titleTemplate(title?: string): string {
  // TODO: 頁面沒有設定標題時，只顯示網站名稱
  return `${title}｜小書店`
}

console.log(titleTemplate('關於我們'))
console.log(titleTemplate(undefined))
console.log(titleTemplate('貓咪的程式課'))
console.log(titleTemplate(''))
