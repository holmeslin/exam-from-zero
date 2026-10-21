export function total(scores: number[]): number {
  return scores.reduce((sum, score) => sum + score);
}
