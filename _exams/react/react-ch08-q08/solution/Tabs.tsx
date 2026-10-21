import { Suspense, use, useState, useTransition } from 'react'

function TabContent({ name, loadTab }: { name: string; loadTab: (name: string) => Promise<string> }) {
  const content = use(loadTab(name))
  return <p>{content}</p>
}

export function Tabs({ loadTab }: { loadTab: (name: string) => Promise<string> }) {
  const [tab, setTab] = useState('首頁')
  const [isPending, startTransition] = useTransition()

  function selectTab(name: string) {
    startTransition(() => setTab(name))
  }

  return (
    <>
      {['首頁', '動態', '設定'].map((name) => (
        <button key={name} onClick={() => selectTab(name)}>
          {name}
        </button>
      ))}
      {isPending && <p>切換中……</p>}
      <Suspense fallback={<p>載入中……</p>}>
        <TabContent name={tab} loadTab={loadTab} />
      </Suspense>
    </>
  )
}
