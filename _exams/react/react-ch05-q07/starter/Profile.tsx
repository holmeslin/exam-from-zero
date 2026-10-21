import { useState } from 'react'

export function Profile() {
  const [user, setUser] = useState({
    name: '小明',
    age: 20,
    address: { city: '台北', zip: '100' },
  })

  function handleBirthday() {
    user.age = user.age + 1
    setUser(user)
  }

  function handleMove() {
    user.address.city = '高雄'
    setUser(user)
  }

  return (
    <div>
      <p>
        {user.name}，{user.age} 歲，住在 {user.address.city}（{user.address.zip}）
      </p>
      <button onClick={handleBirthday}>過生日</button>
      <button onClick={handleMove}>搬家</button>
    </div>
  )
}
