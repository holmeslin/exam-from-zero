export function show(value: string | number): string {
  if (typeof value === "number") {
    return value.toFixed(2);
  }
  return value.toUpperCase();
}

export type User = { name: string };

export function greet(user: User | null): string {
  if (user === null) {
    return "請先登入";
  }
  return `你好，${user.name}`;
}
