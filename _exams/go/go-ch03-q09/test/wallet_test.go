package main

import "testing"

func TestWallet(t *testing.T) {
	var w Wallet
	w.Deposit(100)
	if w.Balance != 100 {
		t.Fatalf("var w Wallet; w.Deposit(100) 之後 Balance = %d, want 100", w.Balance)
	}
	if ok := w.Withdraw(30); !ok || w.Balance != 70 {
		t.Errorf("w.Withdraw(30) = %v，Balance = %d, want true，70", ok, w.Balance)
	}
	if ok := w.Withdraw(500); ok || w.Balance != 70 {
		t.Errorf("餘額不足時 w.Withdraw(500) = %v，Balance = %d, want false，70", ok, w.Balance)
	}
}
