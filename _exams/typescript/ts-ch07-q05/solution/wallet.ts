export class Wallet {
  owner: string;
  #balance = 0;

  constructor(owner: string) {
    this.owner = owner;
  }

  deposit(amount: number): void {
    if (amount <= 0) {
      return;
    }
    this.#balance += amount;
  }

  getBalance(): number {
    return this.#balance;
  }
}
