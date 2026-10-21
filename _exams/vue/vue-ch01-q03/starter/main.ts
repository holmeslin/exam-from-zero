import { readFileSync } from "node:fs";

// 這一行已經寫好：從輸入讀進一個英文名字
const name = readFileSync(0, "utf8").trim();

// TODO：用樣板字面值改寫下面兩行
console.log("哈囉，" + name);
console.log(name);
