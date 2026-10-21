function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

console.log(longest('apple', 'kiwi'));
console.log(longest([1, 2], [1, 2, 3]));
console.log(longest('ab', 'cd'));
