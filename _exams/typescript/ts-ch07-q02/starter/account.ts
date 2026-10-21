export class Account {
  owner: string;
  balance = 0;

  constructor(owner: string) {
    this.owner = owner;
  }

  deposit(amount: number): void {
    // TODO
  }

  withdraw(amount: number): boolean {
    // TODO
    return false;
  }

  describe(): string {
    // TODO
    return "";
  }
}
