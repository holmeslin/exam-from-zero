// root 裡面有：
//   <p>你按了 <span id="count">0</span> 次</p>
//   <button id="add">按我</button>
//   <button id="reset">歸零</button>
export function setupCounter(root: HTMLElement) {
  const countText = root.querySelector('#count') as HTMLElement
  const addButton = root.querySelector('#add') as HTMLButtonElement
  const resetButton = root.querySelector('#reset') as HTMLButtonElement

  let count = 0

  addButton.addEventListener('click', () => {
    count += 1
    countText.textContent = String(count)
  })

  resetButton.addEventListener('click', () => {
    count = 0
    countText.textContent = String(count)
  })
}
