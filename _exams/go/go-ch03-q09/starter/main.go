package main

type Wallet struct {
	Balance int
}

// Deposit 存入 n 元
func (w Wallet) Deposit(n int) {
	w.Balance += n
}

// Withdraw 提領 n 元；餘額不足時不扣款並回傳 false
func (w Wallet) Withdraw(n int) bool {
	if n > w.Balance {
		return false
	}
	w.Balance -= n
	return true
}

func main() {}
