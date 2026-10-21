import { readFileSync } from "node:fs";

// 這一行已經寫好：從輸入讀進總分鐘數（一個整數）
const totalMinutes = Number(readFileSync(0, "utf8"));

const minutes = totalMinutes % 60;
const hours = (totalMinutes - minutes) / 60;

console.log(`${hours} 小時 ${minutes} 分`);
