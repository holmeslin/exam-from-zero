// 修正這個元件，讓它顯示「小明，20 歲」，
// 並且用 style 讓文字是 crimson 色、字級 24px
export function UserBadge() {
  const user = { name: '小明', age: 20 }
  return <p>{user}</p>
}
