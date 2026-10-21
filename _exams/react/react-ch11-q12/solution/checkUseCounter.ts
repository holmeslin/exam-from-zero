import { expect } from "vitest";
import { act, renderHook } from "@testing-library/react";
import type { useCounter as UseCounter } from "./useCounter.ts";

export function checkUseCounter(useCounter: typeof UseCounter) {
  const first = renderHook(() => useCounter());
  expect(first.result.current.count).toBe(0);

  const { result } = renderHook(() => useCounter(10));
  act(() => {
    result.current.increment();
  });
  expect(result.current.count).toBe(11);

  act(() => {
    result.current.reset();
  });
  expect(result.current.count).toBe(10);
}
