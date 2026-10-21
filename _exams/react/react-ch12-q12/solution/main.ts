import { readFileSync } from 'node:fs'

const rootTitle = { default: '小書店', template: '%s｜小書店' }

// pageTitle 是頁面自己設定的標題；沒有設定時是空字串
function resolveTitle(root: { default: string; template: string }, pageTitle: string): string {
  return pageTitle ? root.template.replace('%s', pageTitle) : root.default
}

// 每一行是一個頁面的標題（空行代表那個頁面沒有設定標題）
const lines = readFileSync(0, 'utf8').split('\n')
if (lines.at(-1) === '') lines.pop()
for (const line of lines) {
  console.log(resolveTitle(rootTitle, line.trim()))
}
