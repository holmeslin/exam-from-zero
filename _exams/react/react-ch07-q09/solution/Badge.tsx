import { memo } from 'react'

// 每渲染一次就記一筆，測試用來數渲染次數（不用修改）
export const renderLog: string[] = []

export const Badge = memo(function Badge({ label }: { label: string }) {
  renderLog.push(label)
  return <span>{label}</span>
})
