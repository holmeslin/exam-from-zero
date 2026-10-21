type User = { name: string };

function show(value: string | number): string {
  if (typeof value === "number") {
    return value.toFixed(2);
  }
  return value.toUpperCase();
}

function greet(user: User | null): string {
  if (user === null) {
    return "請先登入";
  }
  return `你好，${user.name}`;
}

const values: (string | number)[] = [3, "abc", 1.5, "vue"];
for (const value of values) {
  console.log(show(value));
}
console.log(greet({ name: "小明" }));
console.log(greet(null));
