export function getLabel(score: number) {
  if (score >= 90) {
    return "優秀";
  } else if (score >= 60) {
    return "及格";
  }
}
