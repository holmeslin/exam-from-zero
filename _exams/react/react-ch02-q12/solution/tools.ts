export default function greet(name) {
  return `你好，${name}！`;
}

export function add(a, b) {
  return a + b;
}

export const VERSION = "1.0";

const secret = "只給這個檔案自己用";

console.log(secret.length > 0 ? "tools 載入完成" : "");
