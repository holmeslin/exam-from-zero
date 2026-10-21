// 舊程式碼用了參數屬性（Node.js 不能直接執行）：
// class Account {
//   constructor(
//     public readonly owner: string,
//     private balance: number,
//   ) {}
//   deposit(amount: number) { ... }
// }
// 改成先宣告屬性、再在建構子裡指定

export class Account {
  readonly owner: string
  private balance: number

  constructor(owner: string, balance: number) {
    // TODO
  }

  deposit(amount: number): number {
    throw new Error('TODO: 實作 deposit')
  }
}
