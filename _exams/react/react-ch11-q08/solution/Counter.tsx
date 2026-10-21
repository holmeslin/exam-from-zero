// 要測的元件（不用改）
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>目前數字：{count}</p>
      <button onClick={() => setCount(count + 1)}>加一</button>
    </div>
  );
}
