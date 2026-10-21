// pub 讓隱藏測試能使用這些項目，之後才會教，請不要拿掉
pub enum Request {
    Transfer { from: i32, to: i32, amount: i32 },
    CheckBalance { account: i32 },
}

// 回傳值：0 = 拒絕、1 = 需要額外確認、2 = 直接通過、3 = 查詢餘額
pub fn review(r: Request, daily_limit: i32) -> i32 {
    match r {
        Request::Transfer { from, to, .. } if from == to => 0,
        Request::Transfer { amount, .. } if amount <= 0 => 0,
        Request::Transfer { amount, .. } if amount > daily_limit => 1,
        Request::Transfer { .. } => 2,
        Request::CheckBalance { .. } => 3,
    }
}
