// 容器寬 containerWidth，項目之間有 gap 的間距，每個項目設定 flex: flexes[i]
// 回傳每個項目分到的寬度（假設項目本身沒有其他寬度）
export function flexWidths(containerWidth: number, gap: number, flexes: number[]): number[] {
  const space = containerWidth - gap * (flexes.length - 1)
  const total = flexes.reduce((sum, f) => sum + f, 0)
  return flexes.map((f) => (space * f) / total)
}
