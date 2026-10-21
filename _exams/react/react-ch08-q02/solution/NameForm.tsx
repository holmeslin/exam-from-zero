import { useActionState } from 'react'

type State = { name: string; error: string | null }

const initialState: State = { name: '', error: null }

export async function saveName(previousState: State, formData: FormData): Promise<State> {
  const name = (formData.get('name') as string).trim()
  if (name === '') {
    return { name: previousState.name, error: '名字不能是空的' }
  }
  return { name, error: null }
}

export function NameForm() {
  const [state, formAction] = useActionState(saveName, initialState)

  return (
    <form action={formAction}>
      <input name="name" defaultValue={state.name} placeholder="名字" />
      <button type="submit">儲存</button>
      {state.error && <p role="alert">{state.error}</p>}
      <p>已儲存的名字：{state.name || '（尚未儲存）'}</p>
    </form>
  )
}
