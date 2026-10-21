export function Toggle() {
  let isOpen = false

  function handleClick() {
    isOpen = !isOpen
  }

  return (
    <div>
      <button onClick={handleClick}>{isOpen ? '收起' : '展開'}</button>
      {isOpen && <p>這是被藏起來的內容。</p>}
    </div>
  )
}
