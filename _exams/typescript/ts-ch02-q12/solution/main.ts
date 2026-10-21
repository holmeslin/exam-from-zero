import { readFileSync } from 'node:fs';

type Student = [string, number[]];

function average(scores: number[]): number | null {
  if (scores.length === 0) {
    return null;
  }
  const total = scores.reduce((sum, score) => sum + score, 0);
  return total / scores.length;
}

const students: Student[] = [];
for (const line of readFileSync(0, 'utf8').split('\n')) {
  const parts = line.trim().split(/\s+/).filter((p) => p !== '');
  if (parts.length === 0) continue;
  const [name, ...rest] = parts;
  students.push([name, rest.map(Number)]);
}

for (const [name, scores] of students) {
  const result = average(scores);
  if (result === null) {
    console.log(`${name}：還沒有成績`);
  } else {
    console.log(`${name}：${result} 分`);
  }
}
