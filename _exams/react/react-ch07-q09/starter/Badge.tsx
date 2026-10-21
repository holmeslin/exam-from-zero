import { memo } from 'react'

// 每渲染一次就記一筆，測試用來數渲染次數（不用修改）
export const renderLog: string[] = []

// TODO: 讓 Badge 在 props 沒變時跳過渲染
export function Badge({ label }: { label: string }) {
  renderLog.push(label)
  return <span>{label}</span>
}
