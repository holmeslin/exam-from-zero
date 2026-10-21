export function getLabel(score: number): string {
  if (score >= 90) {
    return "優秀";
  } else if (score >= 60) {
    return "及格";
  }
  return "不及格";
}
