import { addMessage } from './store.ts'

export type FormState = {
  error?: string
  name?: string
  text?: string
}

// 搭配 useActionState：第一個參數是上一次的狀態，第二個才是 FormData
export async function sign(_previous: FormState, formData: FormData): Promise<FormState> {
  // TODO: 檢查輸入；有錯誤時回傳 { error, name, text }，不要存檔
  const name = String(formData.get('name'))
  const text = String(formData.get('text'))
  await addMessage(name, text)
  return {}
}
