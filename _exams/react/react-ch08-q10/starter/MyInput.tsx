import type { Ref } from 'react'

// TODO：讓父元件傳進來的 ref 指到裡面的 <input>
export function MyInput({ placeholder }: { placeholder?: string; ref?: Ref<HTMLInputElement> }) {
  return <input placeholder={placeholder} />
}
