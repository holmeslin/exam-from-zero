// pub 讓隱藏測試能使用這些項目，之後才會教，請不要拿掉
pub enum Transaction {
    Deposit { amount: i32 },
    Withdraw { amount: i32, fee: i32 },
    Interest { rate_percent: i32 },
}

pub fn apply(balance: i32, t: Transaction) -> i32 {
    match t {
        Transaction::Deposit { amount } => balance + amount,
        Transaction::Withdraw { amount, fee } => {
            let total = amount + fee;
            if total > balance { balance } else { balance - total }
        }
        Transaction::Interest { rate_percent: r } => balance + balance * r / 100,
    }
}
