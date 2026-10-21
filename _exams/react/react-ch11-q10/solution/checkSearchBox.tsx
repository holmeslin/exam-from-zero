import { expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ComponentType } from "react";
import type { SearchBoxProps } from "./SearchBox.tsx";

export async function checkSearchBox(SearchBox: ComponentType<SearchBoxProps>) {
  const user = userEvent.setup();
  const onSearch = vi.fn();
  render(<SearchBox onSearch={onSearch} />);

  await user.type(screen.getByRole("textbox", { name: "搜尋" }), "滑鼠");
  expect(onSearch).not.toHaveBeenCalled();

  await user.click(screen.getByRole("button", { name: "送出" }));
  expect(onSearch).toHaveBeenCalledTimes(1);
  expect(onSearch).toHaveBeenCalledWith("滑鼠");
}
