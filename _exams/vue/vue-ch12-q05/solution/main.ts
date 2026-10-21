import { readFileSync } from 'node:fs'

// 把 pages/ 底下的檔案路徑換成網址
function fileToRoute(file: string): string {
  const segments = file
    .replace(/^pages\//, '')
    .replace(/\.vue$/, '')
    .split('/')
    .filter((seg) => seg !== 'index')
    .map((seg) => seg.replace(/^\[(.+)\]$/, ':$1'))
  return '/' + segments.join('/')
}

const lines = readFileSync(0, 'utf8').split('\n').filter((line) => line.trim() !== '')
for (const line of lines) {
  console.log(fileToRoute(line.trim()))
}
