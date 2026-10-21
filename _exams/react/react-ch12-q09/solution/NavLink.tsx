import type { ReactNode } from 'react'

// pathname 是目前的網址路徑（在 Next.js 裡會用 usePathname() 取得，這裡改成用 props 傳進來）
export function NavLink({ href, pathname, children }: { href: string; pathname: string; children: ReactNode }) {
  const active = pathname === href
  return (
    <a href={href} aria-current={active ? 'page' : undefined}>
      {children}
    </a>
  )
}
