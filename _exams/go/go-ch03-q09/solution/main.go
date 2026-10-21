package main

type Wallet struct {
	Balance int
}

func (w *Wallet) Deposit(n int) {
	w.Balance += n
}

func (w *Wallet) Withdraw(n int) bool {
	if n > w.Balance {
		return false
	}
	w.Balance -= n
	return true
}

func main() {}
