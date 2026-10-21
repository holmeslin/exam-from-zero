export function setupBmi(
  form: HTMLFormElement,
  heightInput: HTMLInputElement,
  weightInput: HTMLInputElement,
  result: HTMLElement,
): void {
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const height = heightInput.valueAsNumber / 100
    const weight = weightInput.valueAsNumber
    if (Number.isNaN(height) || Number.isNaN(weight)) {
      result.textContent = '請輸入身高和體重'
      return
    }
    const bmi = weight / (height * height)
    result.textContent = `BMI：${bmi.toFixed(1)}`
  })
}
