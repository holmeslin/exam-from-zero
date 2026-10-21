import { Routes, Route } from 'react-router'

export function Home() {
  return <h1>首頁</h1>
}

export function About() {
  return <h1>關於我們</h1>
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* TODO: 讓 /about 顯示 About */}
    </Routes>
  )
}
