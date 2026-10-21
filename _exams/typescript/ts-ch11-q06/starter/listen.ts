// 在 root 上監聽 "input" 事件。觸發的是 <input> 時，
// 呼叫 log(`${id}：${value}`)；其他元素（例如 <textarea>）不理會。
export function listenInputs(root: HTMLElement, log: (message: string) => void): void {
  root.addEventListener('input', (event) => {
    // TODO
  })
}
