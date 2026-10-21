import { useEffect, useState } from 'react'

export function WindowWidth() {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    // TODO：元件消失時要把監聽拿掉
  }, [])

  return <p>視窗寬度：{width} px</p>
}
