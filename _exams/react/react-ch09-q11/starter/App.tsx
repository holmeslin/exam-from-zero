import { Link, Outlet, Route, Routes } from 'react-router'

function Layout() {
  return (
    <>
      <nav>
        <Link to="/">首頁</Link> <Link to="/about">關於</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export function NotFound() {
  return (
    <>
      <h1>找不到這一頁</h1>
      <Link to="/">回首頁</Link>
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<h1>首頁</h1>} />
        <Route path="about" element={<h1>關於我們</h1>} />
        {/* TODO: 沒有對應路由的網址顯示 NotFound */}
      </Route>
    </Routes>
  )
}
