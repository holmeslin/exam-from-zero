// 舊程式碼長這樣（Node.js 不能直接執行）：
// namespace Geometry {
//   export const PI = 3.14;
//   export function circleArea(radius: number) {
//     return PI * radius * radius;
//   }
// }
// 改寫成一個模組：直接 export PI 和 circleArea

export function circleArea(radius: number): number {
  throw new Error('TODO: 實作 circleArea')
}
