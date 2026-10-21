import { readFileSync } from 'node:fs'

// 把 pages/ 底下的檔案路徑換成網址
function fileToRoute(file: string): string {
  // TODO: index 代表資料夾本身；[id] 要變成 :id
  const path = file.replace(/^pages\//, '').replace(/\.vue$/, '')
  return '/' + path
}

const lines = readFileSync(0, 'utf8').split('\n').filter((line) => line.trim() !== '')
for (const line of lines) {
  console.log(fileToRoute(line.trim()))
}
