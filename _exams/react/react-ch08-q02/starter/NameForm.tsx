import { useActionState } from 'react'

type State = { name: string; error: string | null }

const initialState: State = { name: '', error: null }

export async function saveName(previousState: State, formData: FormData): Promise<State> {
  // TODO：名字（去掉頭尾空白）是空的，就回傳錯誤訊息「名字不能是空的」並保留舊的名字；
  //       否則回傳新的名字、error 設成 null
  return previousState
}

export function NameForm() {
  // TODO：改用 useActionState(saveName, initialState)，把 formAction 交給 <form action>
  const state = initialState

  return (
    <form>
      <input name="name" defaultValue={state.name} placeholder="名字" />
      <button type="submit">儲存</button>
      {state.error && <p role="alert">{state.error}</p>}
      <p>已儲存的名字：{state.name || '（尚未儲存）'}</p>
    </form>
  )
}
