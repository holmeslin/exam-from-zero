// pub 讓隱藏測試能使用這些項目，之後才會教，請不要拿掉
pub enum Order {
    Paid { amount: i32, discount: i32 },
    Pending,
    Cancelled,
}

pub fn net_income(o: Order) -> i32 {
    let Order::Paid { amount, discount } = o else {
        return 0;
    };
    if discount > amount {
        return 0;
    }
    amount - discount
}
