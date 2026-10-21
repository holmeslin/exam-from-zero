/// a、b 都是 Some，而且兩個值都大於 0 時回傳 Some(兩者相加)，否則回傳 None
pub fn sum_if_positive(a: Option<i32>, b: Option<i32>) -> Option<i32> {
    if let Some(x) = a
        && x > 0
        && let Some(y) = b
        && y > 0
    {
        Some(x + y)
    } else {
        None
    }
}
