// pub 讓隱藏測試能使用這些項目，之後才會教，請不要拿掉
pub enum Hand {
    Rock,
    Paper,
    Scissors,
}

pub fn judge(a: Hand, b: Hand) -> i32 {
    match (a, b) {
        (Hand::Rock, Hand::Scissors) => 1,
        (Hand::Paper, Hand::Rock) => 1,
        (Hand::Scissors, Hand::Paper) => 1,
        (Hand::Rock, Hand::Rock) => 0,
        (Hand::Paper, Hand::Paper) => 0,
        (Hand::Scissors, Hand::Scissors) => 0,
        _ => -1,
    }
}
