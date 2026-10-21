// 只寫 <body> 裡面的內容
export const html = `
  <form>
    <label for="user-name">名字：</label>
    <input id="user-name" type="text" />

    <label for="user-email">信箱：</label>
    <input id="user-email" type="email" />

    <p>喜歡的水果：</p>
    <label><input type="radio" name="fruit" value="apple" /> 蘋果</label>
    <label><input type="radio" name="fruit" value="banana" /> 香蕉</label>

    <label for="city">城市：</label>
    <select id="city">
      <option value="taipei">台北</option>
      <option value="kaohsiung">高雄</option>
    </select>

    <button type="submit">送出</button>
  </form>
`
