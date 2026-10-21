// TODO：讓 greet 回傳字串（不要自己印），沒給名字時用「朋友」
function greet(name) {
  console.log(`你好，${name}！`);
}

const a = greet("小明");
const b = greet();
console.log(a);
console.log(b);
console.log([a, b].join(" / "));
