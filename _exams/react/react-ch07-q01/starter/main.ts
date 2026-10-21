type Action = { type: 'incremented' } | { type: 'decremented' } | { type: 'reset' }

function counterReducer(count: number, action: Action): number {
  // TODO: 依 action.type 回傳新的 count；未知的 type 要丟出錯誤「未知的 action：<type>」
  return count
}

// 以下不用修改：依序套用 action，印出每一步的 state
const actions: Action[] = [
  { type: 'incremented' },
  { type: 'incremented' },
  { type: 'decremented' },
  { type: 'incremented' },
  { type: 'reset' },
  { type: 'decremented' },
]
let state = 5
for (const action of actions) {
  state = counterReducer(state, action)
  console.log(`${action.type} -> ${state}`)
}
try {
  counterReducer(state, { type: 'doubled' } as any)
} catch (e) {
  console.log((e as Error).message)
}
