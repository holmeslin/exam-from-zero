// 舊程式碼長這樣（Node.js 不能直接執行）：
// enum Status {
//   Active = "active",
//   Inactive = "inactive",
// }
// 改寫成 as const 物件，並補上同名的型別與 describe 函式

export const Status = {}

export function describe(status: string): string {
  throw new Error('TODO: 實作 describe')
}
