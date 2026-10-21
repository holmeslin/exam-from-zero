// 這個檔案不用改
import hello, { add as sum, VERSION } from "./tools.ts";

console.log(hello("小明"));
console.log(sum(3, 4));
console.log(`版本 ${VERSION}`);
