export function UserBadge() {
  const user = { name: '小明', age: 20 }
  return (
    <p style={{ color: 'crimson', fontSize: 24 }}>
      {user.name}，{user.age} 歲
    </p>
  )
}
