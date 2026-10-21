/// 整數除法；b 是 0 時要 panic，訊息必須包含「除數不能是 0」。
pub fn divide(a: i32, b: i32) -> i32 {
    if b == 0 {
        panic!("除數不能是 0");
    }
    a / b
}
