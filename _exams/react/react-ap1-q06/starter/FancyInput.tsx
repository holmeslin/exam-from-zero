import type { Ref } from 'react'

export type FancyHandle = { focus(): void; clear(): void }

export function FancyInput({ ref }: { ref?: Ref<FancyHandle> }) {
  // TODO：父元件現在拿到的是整個 <input>，改成只給 focus() 和 clear()
  return <input ref={ref as any} />
}
