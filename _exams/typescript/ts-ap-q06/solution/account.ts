export class Account {
  readonly owner: string
  private balance: number

  constructor(owner: string, balance: number) {
    this.owner = owner
    this.balance = balance
  }

  deposit(amount: number): number {
    this.balance += amount
    return this.balance
  }
}
