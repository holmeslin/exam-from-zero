export function zip<A, B>(as: A[], bs: B[]): [A, B][] {
  const result: [A, B][] = [];
  const n = Math.min(as.length, bs.length);
  for (let i = 0; i < n; i++) {
    result.push([as[i], bs[i]]);
  }
  return result;
}
