import { useEffect } from 'react'

export function ChatRoom({ roomId, muted }: { roomId: string; muted: boolean }) {
  useEffect(() => {
    console.log(`連線到 ${roomId}`)
    const timer = setTimeout(() => {
      if (!muted) console.log(`🔔 已連上 ${roomId}`)
    }, 500)
    return () => {
      clearTimeout(timer)
      console.log(`離開 ${roomId}`)
    }
  }, [roomId, muted])

  return <p>聊天室：{roomId}</p>
}
