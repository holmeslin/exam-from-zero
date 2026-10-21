/// 當 b 不是 0，而且 a / b 大於 limit 時回傳 true；b 是 0 時回傳 false（不可以 panic）
pub fn ratio_above(a: i32, b: i32, limit: i32) -> bool {
    b != 0 && a / b > limit
}
