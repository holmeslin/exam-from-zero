// root 裡面有：
//   <p>你按了 <span id="count">0</span> 次</p>
//   <button id="add">按我</button>
//   <button id="reset">歸零</button>
export function setupCounter(root: HTMLElement) {
  const countText = root.querySelector('#count') as HTMLElement
  const addButton = root.querySelector('#add') as HTMLButtonElement

  let count = 0

  addButton.addEventListener('click', () => {
    count += 1
  })

  // TODO：按下「歸零」時，數字回到 0
}
