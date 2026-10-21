export function describeError(problem: Error | string | null): string {
  if (problem === null) {
    return '沒有錯誤'
  }
  if (problem instanceof Error) {
    return `錯誤：${problem.message}`
  }
  return `錯誤：${problem}`
}
