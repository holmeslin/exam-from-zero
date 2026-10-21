// 表單送出時：阻止頁面重新載入，讀出身高（公分）和體重（公斤），
// 在 result 顯示「BMI：22.5」（小數一位）；任一欄是空的就顯示「請輸入身高和體重」。
export function setupBmi(
  form: HTMLFormElement,
  heightInput: HTMLInputElement,
  weightInput: HTMLInputElement,
  result: HTMLElement,
): void {
  form.addEventListener('submit', (event) => {
    const height = Number(heightInput.value) / 100
    const weight = Number(weightInput.value)
    const bmi = weight / (height * height)
    result.textContent = `BMI：${bmi.toFixed(1)}`
  })
}
