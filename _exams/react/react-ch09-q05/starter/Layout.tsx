import { NavLink } from 'react-router'

export default function Layout() {
  return (
    <>
      <nav>
        <NavLink to="/" end>
          首頁
        </NavLink>{' '}
        <NavLink to="/about">關於</NavLink>
      </nav>
      <main>{/* TODO: 內層路由的內容要出現在這裡 */}</main>
    </>
  )
}
