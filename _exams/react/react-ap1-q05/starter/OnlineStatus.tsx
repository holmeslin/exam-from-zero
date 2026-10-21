import { useState } from 'react'

export function subscribe(callback: () => void) {
  // TODO：註冊 online／offline 事件，並回傳清除函式
  return () => {}
}

export function useOnlineStatus() {
  // TODO：改用 useSyncExternalStore，網路狀態改變時才會更新
  const [online] = useState(navigator.onLine)
  return online
}

export function OnlineStatus() {
  const isOnline = useOnlineStatus()
  return <p>{isOnline ? '有網路' : '沒有網路'}</p>
}
