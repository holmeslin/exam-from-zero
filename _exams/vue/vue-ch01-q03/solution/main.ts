import { readFileSync } from "node:fs";

// 這一行已經寫好：從輸入讀進一個英文名字
const name = readFileSync(0, "utf8").trim();

console.log(`哈囉，${name}！你的名字有 ${name.length} 個字母。`);
console.log(name.toUpperCase());
