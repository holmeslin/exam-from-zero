import { expect } from "vitest";
import { render, screen } from "@testing-library/react";
import type { ComponentType } from "react";

export function checkCategoryBar(CategoryBar: ComponentType<{ current: string }>) {
  render(<CategoryBar current="mouse" />);

  screen.getByRole("heading", { name: "商品" });
  const mouse = screen.getByRole("button", { name: "mouse" }) as HTMLButtonElement;
  const all = screen.getByRole("button", { name: "all" }) as HTMLButtonElement;
  expect(mouse.disabled).toBe(true);
  expect(all.disabled).toBe(false);
}
