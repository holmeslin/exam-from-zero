// input 是從表單讀進來的字串，例如 "100"
// 要回傳加上 5% 稅之後的數字，例如 105
export function addTaxFromInput(input: string): number {
  return input + input * 0.05;
}
