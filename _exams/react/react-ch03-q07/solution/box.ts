type Box = {
  width: number // CSS 裡寫的 width（px）
  padding: string // padding 簡寫，例如 '20px'、'10px 20px'、'10px 20px 5px 30px'
  border: number // 邊框粗細（px）
  boxSizing: 'content-box' | 'border-box'
}

// 回傳盒子在畫面上實際的寬度（含 padding 和 border，不含 margin）
export function boxWidth(box: Box): number {
  if (box.boxSizing === 'border-box') return box.width
  const values = box.padding.split(' ').map((v) => parseInt(v))
  let left = values[0]
  let right = values[0]
  if (values.length === 2) {
    left = values[1]
    right = values[1]
  } else if (values.length === 4) {
    right = values[1]
    left = values[3]
  }
  return box.width + left + right + box.border * 2
}
