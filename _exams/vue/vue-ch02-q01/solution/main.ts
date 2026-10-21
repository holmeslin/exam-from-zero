function greet(name = "朋友") {
  return `你好，${name}！`;
}

const a = greet("小明");
const b = greet();
console.log(a);
console.log(b);
console.log([a, b].join(" / "));
