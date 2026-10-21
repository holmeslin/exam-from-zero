import { NavLink } from 'react-router'

export default function Tabs() {
  return (
    <nav>
      <NavLink to="/" end className="tab">
        首頁
      </NavLink>{' '}
      <NavLink to="/about" className="tab">
        關於
      </NavLink>
    </nav>
  )
}
