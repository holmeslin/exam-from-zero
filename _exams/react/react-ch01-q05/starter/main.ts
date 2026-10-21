const scores = [95, 72, 40, 60, 90, 59];
for (const score of scores) {
  if (score >= 60) {
    console.log(`${score} 分：及格`);
  } else if (score >= 90) {
    console.log(`${score} 分：優等`);
  } else {
    console.log(`${score} 分：不及格`);
  }
}
