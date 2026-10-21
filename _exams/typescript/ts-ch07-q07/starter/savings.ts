export class Account {
  owner: string;
  protected balance = 0;

  constructor(owner: string) {
    this.owner = owner;
  }

  deposit(amount: number): void {
    this.balance += amount;
  }

  describe(): string {
    return `${this.owner}：${this.balance} 元`;
  }
}

export class SavingsAccount extends Account {
  rate: number;

  constructor(owner: string, rate: number) {
    super(owner);
    this.rate = rate;
  }

  addInterest(): void {
    // TODO：餘額加上「餘額 × 利率」
  }

  // TODO：改寫 describe，在父類別的結果後面加上「（年利率 X%）」
}
