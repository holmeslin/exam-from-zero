// pub 讓隱藏測試能使用這些項目，之後才會教，請不要拿掉
pub enum Order {
    Paid { amount: i32, discount: i32 },
    Pending,
    Cancelled,
}

pub fn net_income(o: Order) -> i32 {
    todo!("用 let ... else 取出 Paid 的欄位，不是 Paid 就提早回傳 0")
}
