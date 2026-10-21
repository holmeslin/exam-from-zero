import { useImperativeHandle, useRef, type Ref } from 'react'

export type FancyHandle = { focus(): void; clear(): void }

export function FancyInput({ ref }: { ref?: Ref<FancyHandle> }) {
  const inputRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current!.focus()
    },
    clear() {
      inputRef.current!.value = ''
    },
  }))

  return <input ref={inputRef} />
}
