import { readFileSync } from 'node:fs';

const words = readFileSync(0, 'utf8').split(/\s+/).filter((w) => w !== '');
const counts = new Map<string, number>();
for (const word of words) {
  counts.set(word, (counts.get(word) ?? 0) + 1);
}
for (const [word, count] of counts) {
  console.log(`${word}: ${count}`);
}
