import { createError } from './errors'

const maxNameLength = 20
const maxTextLength = 200

// 收到的資料不可信：參數先當成 unknown，檢查通過才回傳乾淨的 name 和 text
export function validateMessage(rawName: unknown, rawText: unknown) {
  const name = typeof rawName === 'string' ? rawName.trim() : ''
  const text = typeof rawText === 'string' ? rawText.trim() : ''

  if (name === '') {
    throw createError({ status: 400, message: '請輸入名字' })
  }
  if (name.length > maxNameLength) {
    throw createError({ status: 400, message: `名字最多 ${maxNameLength} 個字` })
  }
  if (text === '') {
    throw createError({ status: 400, message: '請輸入留言內容' })
  }
  if (text.length > maxTextLength) {
    throw createError({ status: 400, message: `留言最多 ${maxTextLength} 個字` })
  }

  return { name, text }
}
