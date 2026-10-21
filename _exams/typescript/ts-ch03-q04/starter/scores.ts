// 回傳一個「加上 score 之後」的新陣列，不可以改到原本的 scores
export function addScore(scores: readonly number[], score: number): number[] {
  scores.push(score);
  return scores;
}
