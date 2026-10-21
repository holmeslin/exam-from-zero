// TODO：讓 main.ts 能匯入這些東西
// greet 用預設匯出；add 和 VERSION 用具名匯出；secret 不要匯出

function greet(name) {
  return `你好，${name}！`;
}

function add(a, b) {
  return a + b;
}

const VERSION = "1.0";

const secret = "只給這個檔案自己用";

console.log(secret.length > 0 ? "tools 載入完成" : "");
