export function repeat<T>(value: T, times: number): T[] {
  const result: T[] = [];
  for (let i = 0; i < times; i++) {
    result.push(value);
  }
  return result;
}
