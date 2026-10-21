export function getInput(selector: string): HTMLInputElement {
  const element = document.querySelector(selector)
  if (!(element instanceof HTMLInputElement)) {
    throw new Error(`找不到輸入框 ${selector}`)
  }
  return element
}
