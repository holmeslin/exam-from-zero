export function introduce({ name, age = 18 }) {
  return `${name}，${age} 歲`;
}

export function minMax(numbers) {
  return [Math.min(...numbers), Math.max(...numbers)];
}

export function swap(a, b) {
  [a, b] = [b, a];
  return [a, b];
}
