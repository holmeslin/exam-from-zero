import { useSyncExternalStore } from 'react'

export function subscribe(callback: () => void) {
  window.addEventListener('online', callback)
  window.addEventListener('offline', callback)
  return () => {
    window.removeEventListener('online', callback)
    window.removeEventListener('offline', callback)
  }
}

export function useOnlineStatus() {
  return useSyncExternalStore(
    subscribe,
    () => navigator.onLine,
    () => true,
  )
}

export function OnlineStatus() {
  const isOnline = useOnlineStatus()
  return <p>{isOnline ? '有網路' : '沒有網路'}</p>
}
