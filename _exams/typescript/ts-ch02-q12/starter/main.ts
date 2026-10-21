import { readFileSync } from 'node:fs';

type Student = [string, number[]];

function average(scores: number[]): number | null {
  // TODO：空陣列回傳 null，否則回傳平均
  return 0;
}

const students: Student[] = [];
// TODO：把每一行解析成 Student 放進 students

for (const [name, scores] of students) {
  console.log(`${name}：${average(scores)} 分`);
}
