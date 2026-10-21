import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  function toggleTheme() {
    // TODO: light 與 dark 互相切換
  }

  return (
    <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>
  );
}

export function useTheme() {
  const value = useContext(ThemeContext);
  // TODO: value 是 null 時丟出錯誤「useTheme 必須在 ThemeProvider 裡面使用」
  return value!;
}

export function ThemeButton() {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>目前是 {theme}</button>;
}
