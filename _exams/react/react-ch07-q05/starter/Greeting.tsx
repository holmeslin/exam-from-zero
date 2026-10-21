import { createContext, useContext } from 'react'

export const LangContext = createContext('zh-TW')

export function Greeting() {
  // TODO: 用 useContext 讀取 LangContext，'en' 顯示 Hello，其他顯示 你好
  return <p>你好</p>
}
