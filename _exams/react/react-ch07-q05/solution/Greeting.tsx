import { createContext, useContext } from 'react'

export const LangContext = createContext('zh-TW')

export function Greeting() {
  const lang = useContext(LangContext)
  return <p>{lang === 'en' ? 'Hello' : '你好'}</p>
}
