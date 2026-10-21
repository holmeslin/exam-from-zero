import { NavLink } from 'react-router'

export default function Nav() {
  return (
    <nav>
      <NavLink to="/products" end>
        商品列表
      </NavLink>{' '}
      <NavLink to="/products/new">新增商品</NavLink>
    </nav>
  )
}
