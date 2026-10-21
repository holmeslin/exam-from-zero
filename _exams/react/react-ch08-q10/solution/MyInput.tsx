import type { Ref } from 'react'

export function MyInput({ placeholder, ref }: { placeholder?: string; ref?: Ref<HTMLInputElement> }) {
  return <input placeholder={placeholder} ref={ref} />
}
