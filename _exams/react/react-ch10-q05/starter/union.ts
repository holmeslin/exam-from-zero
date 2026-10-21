export function show(value: string | number): string {
  // TODO: 先用 typeof 縮小範圍
  return value.toFixed(2);
}

export type User = { name: string };

export function greet(user: User | null): string {
  // TODO: 先處理 user 是 null 的情況
  return `你好，${user.name}`;
}
