// 修正這個元件：
// 1. 不要多一層 <div>，改用 Fragment 包住所有元素
// 2. 讓 <label> 和 id 為 email 的 <input> 連在一起
export function Profile() {
  return (
    <div>
      <h1>小明</h1>
      <p>前端學習者</p>
      <label className="field-label">信箱</label>
      <input id="email" type="email" />
    </div>
  )
}
