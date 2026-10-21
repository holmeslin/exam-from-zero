export function collect(times, action) {
  const results = [];
  for (let i = 0; i < times; i++) {
    results.push(action(i));
  }
  return results;
}
