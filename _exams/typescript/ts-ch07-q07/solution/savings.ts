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
    this.balance += this.balance * this.rate;
  }

  override describe(): string {
    return `${super.describe()}（年利率 ${this.rate * 100}%）`;
  }
}
