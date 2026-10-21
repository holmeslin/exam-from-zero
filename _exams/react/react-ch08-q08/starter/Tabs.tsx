import { Suspense, use, useState } from 'react'

function TabContent({ name, loadTab }: { name: string; loadTab: (name: string) => Promise<string> }) {
  const content = use(loadTab(name))
  return <p>{content}</p>
}

export function Tabs({ loadTab }: { loadTab: (name: string) => Promise<string> }) {
  const [tab, setTab] = useState('首頁')

  function selectTab(name: string) {
    // TODO：把這個更新標記成轉場，切換時保留舊內容，並在進行中顯示「切換中……」
    setTab(name)
  }

  return (
    <>
      {['首頁', '動態', '設定'].map((name) => (
        <button key={name} onClick={() => selectTab(name)}>
          {name}
        </button>
      ))}
      <Suspense fallback={<p>載入中……</p>}>
        <TabContent name={tab} loadTab={loadTab} />
      </Suspense>
    </>
  )
}
