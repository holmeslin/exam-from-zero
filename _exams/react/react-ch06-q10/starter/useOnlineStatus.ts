import { useState } from 'react'

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  // TODO：監聽 window 的 online / offline 事件，並在清除函式移除監聽

  return isOnline
}
