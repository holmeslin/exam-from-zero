// 只寫 <body> 裡面的內容
export const html = `
  <form>
    <label>名字：</label>
    <input id="user-name" type="text" />

    <label>信箱：</label>
    <input id="user-email" type="text" />

    <p>喜歡的水果：</p>
    <label><input type="radio" name="fruit-1" value="apple" /> 蘋果</label>
    <label><input type="radio" name="fruit-2" value="banana" /> 香蕉</label>

    <label for="city">城市：</label>
    <select id="city">
      <option value="taipei">台北</option>
      <option value="kaohsiung">高雄</option>
    </select>

    <button type="submit">送出</button>
  </form>
`
