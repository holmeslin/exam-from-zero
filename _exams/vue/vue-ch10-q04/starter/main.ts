type User = { name: string };

// TODO：數字用 toFixed(2)，字串用 toUpperCase()
function show(value: string | number): string {
  return String(value);
}

// TODO：user 是 null 時回傳「請先登入」
function greet(user: User | null): string {
  return `你好，${user?.name}`;
}

const values: (string | number)[] = [3, "abc", 1.5, "vue"];
for (const value of values) {
  console.log(show(value));
}
console.log(greet({ name: "小明" }));
console.log(greet(null));
