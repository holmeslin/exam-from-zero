// pub 讓隱藏測試能使用這些項目，之後才會教，請不要拿掉
pub enum Transaction {
    Deposit { amount: i32 },
    Withdraw { amount: i32, fee: i32 },
    Interest { rate_percent: i32 },
}

pub fn apply(balance: i32, t: Transaction) -> i32 {
    todo!("用 match 解構 struct variant，回傳交易後的餘額")
}
