import { useEffect, useEffectEvent } from 'react'

export function ChatRoom({ roomId, muted }: { roomId: string; muted: boolean }) {
  const onConnected = useEffectEvent(() => {
    if (!muted) console.log(`🔔 已連上 ${roomId}`)
  })

  useEffect(() => {
    console.log(`連線到 ${roomId}`)
    const timer = setTimeout(() => onConnected(), 500)
    return () => {
      clearTimeout(timer)
      console.log(`離開 ${roomId}`)
    }
  }, [roomId])

  return <p>聊天室：{roomId}</p>
}
