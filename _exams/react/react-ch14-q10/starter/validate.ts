const maxNameLength = 20
const maxTextLength = 200

export type ValidationResult =
  | { ok: true; name: string; text: string }
  | { ok: false; error: string; name: string; text: string }

export function validateMessage(rawName: unknown, rawText: unknown): ValidationResult {
  // TODO: 收到的資料不可信：不是字串就當成空字串，並檢查長度
  const name = String(rawName).trim()
  const text = String(rawText).trim()

  if (name === '') return { ok: false, error: '請輸入名字', name, text }
  if (text === '') return { ok: false, error: '請輸入留言內容', name, text }
  return { ok: true, name, text }
}
