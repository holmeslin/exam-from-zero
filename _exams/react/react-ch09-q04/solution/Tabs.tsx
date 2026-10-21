import { NavLink } from 'react-router'

function tabClass({ isActive }: { isActive: boolean }) {
  return isActive ? 'tab tab-on' : 'tab'
}

export default function Tabs() {
  return (
    <nav>
      <NavLink to="/" end className={tabClass}>
        首頁
      </NavLink>{' '}
      <NavLink to="/about" className={tabClass}>
        關於
      </NavLink>
    </nav>
  )
}
