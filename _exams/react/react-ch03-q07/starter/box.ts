type Box = {
  width: number // CSS 裡寫的 width（px）
  padding: string // padding 簡寫，例如 '20px'、'10px 20px'、'10px 20px 5px 30px'
  border: number // 邊框粗細（px）
  boxSizing: 'content-box' | 'border-box'
}

// 回傳盒子在畫面上實際的寬度（含 padding 和 border，不含 margin）
export function boxWidth(box: Box): number {
  return box.width
}
