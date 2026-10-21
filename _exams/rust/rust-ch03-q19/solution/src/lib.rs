// pub 讓隱藏測試能使用這些項目，之後才會教，請不要拿掉
pub enum Step {
    Value(i32),
    Done,
}

// 已經寫好，不用改：n 是 1 就結束，否則依 Collatz 規則算出下一個數字
pub fn step(n: i32) -> Step {
    if n == 1 {
        Step::Done
    } else if n % 2 == 0 {
        Step::Value(n / 2)
    } else {
        Step::Value(3 * n + 1)
    }
}

pub fn count_steps(start: i32) -> i32 {
    let mut n = start;
    let mut count = 0;
    while let Step::Value(next) = step(n) {
        n = next;
        count += 1;
    }
    count
}
