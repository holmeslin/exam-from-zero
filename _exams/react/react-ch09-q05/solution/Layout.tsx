import { NavLink, Outlet } from 'react-router'

export default function Layout() {
  return (
    <>
      <nav>
        <NavLink to="/" end>
          首頁
        </NavLink>{' '}
        <NavLink to="/about">關於</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  )
}
