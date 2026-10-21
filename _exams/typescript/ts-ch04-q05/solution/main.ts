function report(title: string, ...scores: number[]) {
  const best = Math.max(...scores);
  console.log(`${title}：共 ${scores.length} 筆，最高 ${best} 分`);
}

const midterm = [72, 95, 88];
report("期中考", ...midterm);
report("小考", 60, 70);
