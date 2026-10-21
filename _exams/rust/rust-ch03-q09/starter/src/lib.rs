// pub 讓隱藏測試能使用這些項目，之後才會教，請不要拿掉
pub enum Hand {
    Rock,
    Paper,
    Scissors,
}

pub fn judge(a: Hand, b: Hand) -> i32 {
    todo!("a 贏回傳 1，b 贏回傳 -1，平手回傳 0")
}
