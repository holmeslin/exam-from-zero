import { createError } from './errors'

const maxNameLength = 20
const maxTextLength = 200

// 收到的資料不可信：參數先當成 unknown，檢查通過才回傳乾淨的 name 和 text
export function validateMessage(rawName: unknown, rawText: unknown) {
  // 目前只擋得住空值，擋不住數字、只有空白、太長的資料
  if (!rawName || !rawText) {
    throw createError({ status: 400, message: '名字和留言都要填' })
  }
  return { name: rawName as string, text: rawText as string }
}
