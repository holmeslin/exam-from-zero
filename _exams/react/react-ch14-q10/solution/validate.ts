const maxNameLength = 20
const maxTextLength = 200

export type ValidationResult =
  | { ok: true; name: string; text: string }
  | { ok: false; error: string; name: string; text: string }

export function validateMessage(rawName: unknown, rawText: unknown): ValidationResult {
  const name = typeof rawName === 'string' ? rawName.trim() : ''
  const text = typeof rawText === 'string' ? rawText.trim() : ''

  if (name === '') return { ok: false, error: '請輸入名字', name, text }
  if (name.length > maxNameLength) {
    return { ok: false, error: `名字最多 ${maxNameLength} 個字`, name, text }
  }
  if (text === '') return { ok: false, error: '請輸入留言內容', name, text }
  if (text.length > maxTextLength) {
    return { ok: false, error: `留言最多 ${maxTextLength} 個字`, name, text }
  }
  return { ok: true, name, text }
}
