import { readFileSync } from "node:fs";

// 把 runtimeConfig 的設定路徑（例如 public.siteName）換成對應的環境變數名稱
function toEnvName(path: string): string {
  // TODO: 依照 Nuxt 的規則轉換
  return "NUXT_" + path.toUpperCase();
}

const lines = readFileSync(0, "utf8").split("\n").filter((line) => line.trim() !== "");
for (const line of lines) {
  console.log(toEnvName(line.trim()));
}
