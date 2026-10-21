// 用 querySelector 找到元素，確認它真的是 <input> 才回傳；
// 找不到或不是輸入框，就丟出 Error（訊息包含 selector）
export function getInput(selector: string): HTMLInputElement {
  const element = document.querySelector(selector)
  return element as HTMLInputElement
}
