// pub 讓隱藏測試能使用這些項目，之後才會教，請不要拿掉
pub fn edge_product(v: &[i32]) -> i32 {
    match v {
        [] => 0,
        [x] => x * x,
        [first, .., last] => first * last,
    }
}
