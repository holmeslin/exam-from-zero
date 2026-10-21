import { memo, useCallback, useState } from 'react'

// 每渲染一次就記一筆，測試用來數渲染次數（不用修改）
export const saveRenders: number[] = []

// SaveButton 已經用 memo 包好了（不用修改）
export const SaveButton = memo(function SaveButton({ onSave }: { onSave: () => void }) {
  saveRenders.push(1)
  return <button onClick={onSave}>儲存</button>
})

export function Editor() {
  const [count, setCount] = useState(0)
  const [saved, setSaved] = useState(false)

  // setSaved 本身不會變，所以依賴陣列可以是空的
  const handleSave = useCallback(() => setSaved(true), [])

  return (
    <>
      <button onClick={() => setCount(count + 1)}>點了 {count} 次</button>
      <SaveButton onSave={handleSave} />
      <p>{saved ? '已儲存' : '尚未儲存'}</p>
    </>
  )
}
