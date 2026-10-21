import { addMessage } from './store.ts'

export type FormState = {
  error?: string
  name?: string
  text?: string
}

export async function sign(_previous: FormState, formData: FormData): Promise<FormState> {
  const name = String(formData.get('name')).trim()
  const text = String(formData.get('text')).trim()

  if (name === '') return { error: '請輸入名字', name, text }
  if (text === '') return { error: '請輸入留言內容', name, text }

  await addMessage(name, text)
  return {}
}
