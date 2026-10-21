use rust_ch03_q07::{apply, Transaction};

#[test]
fn hidden_deposit() {
    assert_eq!(apply(100, Transaction::Deposit { amount: 50 }), 150, "100 存入 50 應該變 150");
}

#[test]
fn hidden_withdraw() {
    assert_eq!(apply(100, Transaction::Withdraw { amount: 30, fee: 5 }), 65, "100 提領 30、手續費 5 應該剩 65");
    assert_eq!(apply(100, Transaction::Withdraw { amount: 95, fee: 5 }), 0, "提領加手續費剛好等於餘額時應該剩 0");
    assert_eq!(apply(100, Transaction::Withdraw { amount: 98, fee: 5 }), 100, "餘額不足時交易不成立，餘額維持 100");
}

#[test]
fn hidden_interest() {
    assert_eq!(apply(200, Transaction::Interest { rate_percent: 5 }), 210, "200 加 5% 利息應該是 210");
    assert_eq!(apply(150, Transaction::Interest { rate_percent: 10 }), 165, "150 加 10% 利息應該是 165");
}
