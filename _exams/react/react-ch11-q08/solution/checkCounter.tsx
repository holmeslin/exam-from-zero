import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ComponentType } from "react";

export async function checkCounter(Counter: ComponentType) {
  const user = userEvent.setup();
  render(<Counter />);

  screen.getByText("目前數字：0");

  const button = screen.getByRole("button", { name: "加一" });
  await user.click(button);
  await user.click(button);
  await user.click(button);

  screen.getByText("目前數字：3");
}
