import { readFileSync } from "node:fs";

// 這一行已經寫好：從輸入讀進總分鐘數（一個整數）
const totalMinutes = Number(readFileSync(0, "utf8"));

// TODO：算出是幾小時又幾分鐘
const hours = 0;
const minutes = 0;

console.log(`${hours} 小時 ${minutes} 分`);
