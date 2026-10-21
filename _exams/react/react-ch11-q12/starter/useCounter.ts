// 要測的 Hook（不用改）
import { useState } from "react";

export function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);

  function increment() {
    setCount((current) => current + 1);
  }

  function reset() {
    setCount(initial);
  }

  return { count, increment, reset };
}
