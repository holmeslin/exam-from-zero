export function greet(name: string, times: number): string {
  let result = "";
  for (let i = 0; i < times; i++) {
    result += `你好，${name}！`;
  }
  return result;
}
