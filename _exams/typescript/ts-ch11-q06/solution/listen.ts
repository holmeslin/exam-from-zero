export function listenInputs(root: HTMLElement, log: (message: string) => void): void {
  root.addEventListener('input', (event) => {
    if (event.target instanceof HTMLInputElement) {
      log(`${event.target.id}：${event.target.value}`)
    }
  })
}
